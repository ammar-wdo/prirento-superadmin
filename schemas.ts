import * as z from "zod"



export const loginSchema = z.object({
    username: z.string().min(2,'At least 2 characters').max(20,'maximum 20 characters'),
    password:z.string().min(2,'At least 2 characters').max(20,'maximum 20 characters')
  })


export const locationSchema = z.object({
    name: z.string().min(2,'At least 2 characters').max(20,'maximum 20 characters'),

  })
export const subLocationSchema = z.object({
    name: z.string().min(2,'At least 2 characters').max(100,'maximum 100 characters'),
    locationId:z.string().min(2)

  })


export const categorySchema = z.object({
    name: z.string().min(2,'At least 2 characters').max(20,'maximum 20 characters'),

  })


  const newPassword = z.string().min(8,{message:"Enter at least 8 chars"});
export const companySchema = z.object({
    name: z.string().min(2,'At least 2 characters').max(20,'maximum 20 characters'),
    categoryId: z.string().min(2,'At least 2 characters'),
    email:z.string().min(2,'E-mail is required').email(),
    password:z.string().min(8,'Password should be at least 8 chars'),
    newPassword:  z.union([z.string(), z.undefined()])
    .refine((val) => !val || newPassword.safeParse(val).success),
    address:z.string().min(2,'at least 2 cars'),
    phoneNumber: z.string().refine((value) => {
      const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
      return phoneRegex.test(value);
    }, "Invalid phone number"),
    whatsApp: z.string().refine((value) => {
      const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
      return phoneRegex.test(value);
    }, "Invalid phone number"),
    logo:z.string().min(2,'company logo is required'),
    gallary:z.array(z.string()),
    content:z.string().min(10,'at least 10 chars are required'),
    promoted:z.coerce.boolean().default(false),
    openingTime:z.array(z.string()).optional(),
    terms:z.string().min(20,"Terms are required")



  })