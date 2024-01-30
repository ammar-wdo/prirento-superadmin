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
});

export const subLocationSchema = z.object({
  name: requiredString.max(100, "maximum 100 characters"),
  locationId: requiredString,
});

export const categorySchema = z.object({
  name: requiredString.max(20, "maximum 20 characters"),
});

const newPassword = z.string().min(8, { message: "Enter at least 8 chars" });
export const companySchema = z.object({
  name: requiredString.max(20, "maximum 20 characters"),
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
  openingTime: z.array(z.string()).optional(),
  terms: requiredString,
});

export const carBrandSchema = z.object({
  brand: requiredString.max(20, "maximum 20 characters"),
  logo: z.string().min(1, "You should upload a logo"),
});

export const carModelSchema = z.object({
  name: z
    .string()
    .min(2, "Model field is required")
    .max(20, "maximum 20 characters"),
  carBrandId: z.string().min(1, "Brand is required"),
});

//car schema

export const carTypes = [
  "SUV",
  "super cars",
  "sports",
  "convertable",
  "classics",
  "business",
];
export const transmition = ["auto", "manual"];
export const electric = ["fully electric", "hybrid"];
export const carStatus = ["pending", "active"];
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
];

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
  colors: requiredString.refine(
    (data) => carColors.includes(data),
    "Invalid color input"
  ),
  interiorColor: requiredString.refine(
    (data) => carColors.includes(data),
    "Invalid color input"
  ),
});

const carTypeSchema = z
  .object({
    carType: requiredString,
  })
  .refine((data) => carTypes.includes(data.carType), {
    message: "Invalid car type",
  });

const transmitionSchema = z
  .object({
    transmition: requiredString,
  })
  .refine((data) => transmition.includes(data.transmition), {
    message: "Invalid transmition type",
  });

const electricSchema = z
  .object({
    electric: requiredString,
  })
  .refine((data) => electric.includes(data.electric), {
    message: "invalid electric option",
  });

const carStatusSchema = z
  .object({
    carStatus: requiredString,
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
    deleviryFee: requiredNumber
      .refine((val) => val, "Required field")
      .refine((val) => val > 0, "Enter positive value"),
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
    .array(
      z.coerce.number()
    )
    .refine((pricings) => !pricings.includes(0), {
      message: "Pricings cannot include zero",
    }).refine(pricings=>!pricings.some(val=>val<0),{message:'Negative values not allowed'}),
  hourPrice: requiredNumber
  .refine((val) => val > 0, "Enter positive value")
   
});



export const availabilitySchema = z.object({
  label: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
}).refine((data) => {

  const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
  const endDateTime = new Date(`${data.endDate}T${data.endTime}`);


  return startDateTime < endDateTime;
}, {
  message: "Start date and time must be before end date and time",
  path: ["endDate", "endTime"], 
})
