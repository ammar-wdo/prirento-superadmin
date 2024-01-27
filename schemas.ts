import * as z from "zod";

const requiredString = z.string().min(1, "Required field");

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

export const carSchema = z
  .object({
    description: requiredString,
    years: requiredString,
    colors: requiredString,
    interiorColor: requiredString,
    seats: z.coerce
      .number()
      .min(1, "Minimum of 1 seat")
      .max(7, "Maximum of 7 seats"),
    doors: z.coerce
      .number()
      .min(2, "Minimum of 2 doors")
      .max(4, "Maximum of 4 doors"),
    engine: requiredString,
    kmIncluded: z.coerce.number(),
    gallary: z
      .array(requiredString)
      .min(1, "Upload at least 1 image")
      .max(6, "Maximum of 6 images allowed"),
    deposite: z.coerce.number().positive({ message: "Enter positive value " }),
    commession: z.coerce
      .number()
      .positive({ message: "Enter positive value " }),
    reservationFlatFee: z.coerce
      .number()
      .positive({ message: "Enter positive value " })
      .optional(),
    reservationPercentage: z.coerce
      .number()
      .positive({ message: "Enter positive value " })
      .optional(),
    pricings: z.array(
      z.coerce.number().positive({ message: "Enter positive value " })
    ),
    hourPrice: z.coerce.number().positive({ message: "Enter positive value " }),
    minimumHours: z.coerce
      .number()
      .positive({ message: "Enter positive value " })
      .optional()
      .or(z.literal(undefined)),
    deleviryFee: z.coerce
      .number()
      .positive({ message: "Enter positive value " }),
    coolDown: z.coerce.number().positive({ message: "Enter positive value " }),
    additionalFeatures: z
      .array(z.object({ title: z.string(), icon: z.string() }))
      .optional(),
    disabled: z.boolean().optional(),
    pickupLocations: z.array(z.string()).min(1, "Pick at least one location"),
    dropoffLocations: z.array(z.string()).min(1, "Pick at least one location"),
    pickupSubLocations:z.array(z.string()),
    dropoffSubLocations:z.array(z.string()),
    companyId: requiredString,
    carModelId: requiredString,
  })
  .refine((data) => data.reservationFlatFee || data.reservationPercentage, {
    message: "Reservation flat fee or reservation percentage is required",
    path: ["reservationFlatFee", "reservationPercentage"],
  })
  .and(carTypeSchema)
  .and(transmitionSchema)
  .and(electricSchema)
  .and(carStatusSchema);
