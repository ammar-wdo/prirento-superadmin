import * as z from "zod"



export const loginSchema = z.object({
    username: z.string().min(2,'Atleast 2 characters').max(20,'maximum 20 characters'),
    password:z.string().min(2,'Atleast 2 characters').max(20,'maximum 20 characters')
  })