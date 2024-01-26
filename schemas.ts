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