import { SuperadminType } from "@prisma/client";
import * as z from "zod";

const requiredString = z.string().min(1, "Required field");

const requiredNumber = z.preprocess((input) => {
  return input === "" ? undefined : Number(input);
}, z.number());

const slugSchema = requiredString
  .max(200, "Slug is too long") //
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");

export const loginSchema = z.object({
  username: requiredString.max(20, "maximum 20 characters"),
  password: z
    .string()
    .min(2, "Password should be at least 8 chars")
    .max(20, "maximum 20 characters"),
});

export const locationSchema = z.object({
  name: requiredString.max(20, "maximum 20 characters"),
  slug: slugSchema,
});

export const subLocationSchema = z.object({
  name: requiredString.max(100, "maximum 100 characters"),
  slug: slugSchema,
  locationId: requiredString,
});

export const categorySchema = z.object({
  name: requiredString.max(20, "maximum 20 characters"),
});

const newPassword = z.string().min(8, { message: "Enter at least 8 chars" });

const dayOpeningTimeSchema = z.object({
  openTime: z.string().min(1, "Open time is required"),
  closeTime: z.string().min(1, "Close time is required"),
  closed: z.boolean(),
});
export const companySchema = z.object({
  name: requiredString.max(100, "maximum 100 characters"),
  categoryId: requiredString,
  email: requiredString.min(2, "E-mail is required").email(),
  slug: slugSchema,
  password: z.string().min(8, "Password should be at least 8 chars"),
  newPassword: z
    .union([z.string(), z.undefined()])
    .refine((val) => !val || newPassword.safeParse(val).success),
  address: requiredString,
  phoneNumber: requiredString.refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  whatsApp: requiredString.refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  logo: z.string().min(1, "You should upload a logo"),
  gallary: z.array(requiredString),
  content: requiredString,
  promoted: z.coerce.boolean().default(false),
  away: z.coerce.boolean(),
  openingTime: z.object({
    Monday: dayOpeningTimeSchema,
    Tuesday: dayOpeningTimeSchema,
    Wednesday: dayOpeningTimeSchema,
    Thursday: dayOpeningTimeSchema,
    Friday: dayOpeningTimeSchema,
    Saturday: dayOpeningTimeSchema,
    Sunday: dayOpeningTimeSchema,
  }),
  terms: requiredString,
});

export const carBrandSchema = z.object({
  brand: requiredString.max(20, "maximum 20 characters"),
  logo: z.string().min(1, "You should upload a logo"),
});

export const carModelSchema = z.object({
  name: z
    .string()
    .min(1, "Model field is required")
    .max(150, "maximum 20 characters"),
  carBrandId: z.string().min(1, "Brand is required"),
});

//car schema

export const carTypes = [
  "SUV",
  "super_cars",
  "sports",
  "convertable",
  "classics",
  "business",
] as const;
export const transmition = ["auto", "manual"] as const;
export const electric = ["none", "fully_electric", "hybrid"] as const;
export const carStatus = ["pending", "active"] as const;
export const carColors = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Brown",
  "Green",
  "Beige",
  "Gold",
  "Orange",
  "Yellow",
  "Purple",
  "Maroon",
  "Navy",
  "Charcoal",
  "Other",
] as const;

export const carColorsMapper = {
  Black: "#000000",
  White: "#FFFFFF",
  Silver: "#C0C0C0",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Brown: "#A52A2A",
  Green: "#008000",
  Beige: "#F5F5DC",
  Gold: "#FFD700",
  Orange: "#FFA500",
  Yellow: "#FFFF00",
  Purple: "#800080",
  Maroon: "#800000",
  Navy: "#000080",
  Charcoal: "#36454F",
};

const colorSchema = z.object({
  colors: z.enum(carColors).refine((data) => carColors.includes(data), {
    message: "invalid electric option",
  }),
  interiorColor: z.enum(carColors).refine((data) => carColors.includes(data), {
    message: "invalid electric option",
  }),
});

const carTypeSchema = z
  .object({
    carType: z.enum(carTypes),
  })
  .refine((data) => carTypes.includes(data.carType), {
    message: "invalid electric option",
  });
const transmitionSchema = z
  .object({
    transmition: z.enum(transmition),
  })
  .refine((data) => transmition.includes(data.transmition), {
    message: "invalid electric option",
  });
const electricSchema = z
  .object({
    electric: z.enum(electric),
  })
  .refine((data) => electric.includes(data.electric), {
    message: "invalid electric option",
  });

const carStatusSchema = z
  .object({
    carStatus: z.enum(carStatus),
  })
  .refine((data) => carStatus.includes(data.carStatus));

const numericValues = z
  .object({
    seats: requiredNumber
      .refine((val) => val, "Required field")
      .refine(
        (value) => value >= 1 && value <= 7,
        "Minimum of 1 and maximum of 7"
      ),
    doors: requiredNumber
      .refine((val) => val, "Required field")
      .refine(
        (value) => value >= 2 && value <= 4,
        "Minimum of 2 and maximum of 4"
      ),
    deposite: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),
    commession: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),
    reservationFlatFee: z.coerce.number().optional().or(z.literal(undefined)),
    reservationPercentage: z.coerce
      .number()
      .optional()
      .or(z.literal(undefined)),
    kmIncluded: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),

    minimumHours: z.coerce
      .number()
      .positive({ message: "Enter positive value " })
      .optional()
      .or(z.literal(undefined)),
    deleviryFee: requiredNumber.refine(
      (val) => !val || val >= 0,
      "Enter positive value"
    ),
    coolDown: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),
  })
  .refine((data) => data.reservationFlatFee || data.reservationPercentage, {
    message: "Reservation flat fee or reservation percentage is required",
    path: ["reservationFlatFee"],
  })
  .refine(
    (val) =>
      (val.reservationFlatFee && !val.reservationPercentage) ||
      (!val.reservationFlatFee && val.reservationPercentage),
    {
      message: "Enter either reservation flat fee or reservation percentage",
      path: ["reservationFlatFee"],
    }
  )
  .refine((val) => !val.reservationFlatFee || val.reservationFlatFee > 0, {
    message: "Enter positive value",
    path: ["reservationFlatFee"],
  })
  .refine(
    (val) => !val.reservationPercentage || val.reservationPercentage > 0,
    {
      message: "Enter positive value",
      path: ["reservationPercentage"],
    }
  );
export const carSchema = z
  .object({
    description: requiredString,
    year: requiredString
      .refine((data) => /^\d+$/.test(data), {
        message: "Year must be a number.",
      })
      .refine((data) => data.length === 4, {
        message: "Year must be exactly 4 digits.",
      }),
    slug: slugSchema,

    engine: requiredString,

    gallary: z
      .array(requiredString)
      .min(1, "Upload at least 1 image")
      .max(6, "Maximum of 6 images allowed"),

    additionalFeatures: z
      .array(z.object({ title: z.string(), icon: z.string() }))
      .optional(),
    disabled: z.boolean().optional(),
    pickupLocations: z.array(z.string()).min(1, "Pick at least one location"),
    dropoffLocations: z.array(z.string()).min(1, "Pick at least one location"),
    pickupSubLocations: z.array(z.string()),
    dropoffSubLocations: z.array(z.string()),
    companyId: requiredString,
    carModelId: requiredString,
  })

  .and(carTypeSchema)
  .and(transmitionSchema)
  .and(electricSchema)
  .and(carStatusSchema)
  .and(colorSchema)
  .and(numericValues);

export const carPricingsSchema = z.object({
  pricings: z
    .array(z.coerce.number())
    .refine((pricings) => !pricings.includes(0), {
      message: "Pricings cannot include zero",
    })
    .refine((pricings) => !pricings.some((val) => val < 0), {
      message: "Negative values not allowed",
    }),
  hourPrice: requiredNumber.refine((val) => val > 0, "Enter positive value"),
});

const timeSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const dateSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const carAvailabilitySchema = z
  .object({
    label: z.string().optional(),
  })
  .and(timeSchema)
  .and(dateSchema)
  .refine(
    (data) => {
      const { startDate, endDate, startTime, endTime } = data;

      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      return startDateTime < endDateTime;
    },
    {
      message: "Start date must be before end date",
      path: ["endTime"],
    }
  );

export const discountType = ["fixed", "percentage"] as const;
export const discountApplyType = ["created", "booked"] as const;

export const carDiscountSchema = z
  .object({
    label: requiredString,
    promocode: requiredString,
    carId: z.string().optional().or(z.literal(undefined)),
    type: z
      .enum(discountType)
      .refine((val) => discountType.includes(val), "Invalid input "),
    value: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),

    discountApplyType: z
      .enum(discountApplyType)
      .refine((val) => discountApplyType.includes(val), "Invalid input"),
    applyToAll: z.coerce.boolean().default(true),
  })
  .and(timeSchema)
  .and(dateSchema)
  .refine(
    (data) => {
      const { startDate, endDate, startTime, endTime } = data;

      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      return startDateTime < endDateTime;
    },
    {
      message: "Start date and time must be before end date and time",
      path: ["endTime"],
    }
  )
  .refine((data) => data.type === "fixed" || data.value <= 20, {
    message: "Percentage should not be greater than 20%",
    path: ["value"],
  })
  .refine(
    (data) =>
      (!data.carId && data.applyToAll) || (data.carId && !data.applyToAll),
    { message: "Either to all cars or one car is allowed", path: ["carId"] }
  );

export const superAdmintype = ["fixed", "percentage"] as const;

export const superAdminSchema = z
  .object({
    label: requiredString,
    description: requiredString,
    type: z
      .enum(superAdmintype)
      .refine((val) => superAdmintype.includes(val), "Invalid value"),
    value: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),
    mandatory: z.coerce.boolean().default(false),
    applyToAll: z.coerce.boolean().default(true),
    carId: z.string().optional().or(z.literal(undefined)),
  })
  .refine((data) => data.type === "fixed" || data.value <= 20, {
    message: "Percentage should not be greater than 20%",
    path: ["value"],
  })
  .refine(
    (data) =>
      (!data.carId && data.applyToAll) || (data.carId && !data.applyToAll),
    { message: "Either to all cars or one car is allowed", path: ["carId"] }
  );

export const carExtraOptionStatus = ["pending", "active"] as const;

export const carExtraOptionsSchema = z.object({
  label: requiredString,
  description: requiredString,
  price: requiredNumber
    .refine((val) => val, "Required field")
    .refine((val) => val > 0, "Enter positive value"),
  status: z
    .enum(carExtraOptionStatus)
    .refine((val) => carExtraOptionStatus.includes(val), "Invalid input"),
  logo: requiredString,
});

export const blogCategorySchema = z.object({
  label: requiredString,
  slug: requiredString,
});

export const blogSchema = z.object({
  title: requiredString,
  content: requiredString,
  slug: requiredString,
  author: requiredString,
  shortDescription: requiredString,
  tags: z.array(z.string()),
  logo: z.string().min(1, { message: "Upload an image please " }),
  categoryId: z.string().min(1),
});

export const aboutSchema = z.object({
  content: requiredString,
});

export const faqSchema = z.object({
  question: requiredString,
  answer: requiredString,
});

export const termsSchema = z.object({
  content: requiredString,
});

export const privacySchema = z.object({
  content: requiredString,
});

export const reviewVisibility = ["FIRSTNAME", "FULLNAME", "ANOUNYMOS"] as const;

export const reviewVisibilityArray = ["FIRSTNAME", "FULLNAME", "ANOUNYMOS"];

export const reviewStatus = ["PENDING", "ACTIVE"] as const;
export const reviewStatusArray = ["PENDING", "ACTIVE"]

export const reviewSchema = z
  .object({
    companyId: z.string().min(1),
    carId: z.string().min(1),
    firstName: z.string().optional().or(z.literal(undefined)),
    lastName: z.string().optional().or(z.literal(undefined)),
    email: z.string().email(),
    reviewContent: z.string().optional(),
    rate: z.number(),
    visibility: z.enum(reviewVisibility).default("FULLNAME"),
    status: z.enum(reviewStatus).default("PENDING"),
    placeholderDate: z.date(),
  })
  .refine((data) => (data.visibility !== "FIRSTNAME") || !!data.firstName, {
    message: "First name is required",
    path: ["firstName"],
  })
  .refine(
    (data) =>
      (data.visibility !== "FULLNAME") || (!!data.firstName && !!data.lastName),
    { message: "Firstname and Lastname are required", path: ["lastName"] }
  );



  export const pushNotificationsSchema = z.object({
    title: requiredString,
    description: requiredString.optional().or(z.literal(undefined)),
    expoPushNotificationId: requiredString.optional().or(z.literal(undefined)),
 companyId:requiredString
  });