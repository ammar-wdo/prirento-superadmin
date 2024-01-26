"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { categorySchema, companySchema, locationSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import bcrypt from 'bcryptjs';












export const addCompany = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    const validData = companySchema.safeParse(data);
    if (!validData.success) return { message: "Invalid inputs" };

    const {newPassword,...values} = validData.data
    
    const exist = await  prisma.company.findUnique({where:{
        email:values.email
    }})

    if(exist)  return { message: "This E-mail already exists" };

    const hashedPassword = await bcrypt.hash(values.password, 10);

    await prisma.company.create({
      data: {
        ...values,
        password:hashedPassword
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};














export const editCompany = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    if (!id || typeof id !== "string") return { message: "Invalid Id " };

    const validData = companySchema.safeParse(data);
    if (!validData.success) return { message: "Invalid inputs" };


    const { newPassword, password, ...rest } = validData.data;
    let thePassword;
    if (newPassword) {
      thePassword = await await bcrypt.hash(newPassword, 10);
    } else {
      thePassword = password;
    }





    await prisma.company.update({
      where: {
        id,
      },
      data: {
       ...rest,
       password:thePassword
      },
    });

    return { success: "Successfully updated" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};











export const deleteCompany = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    if (!id || typeof id !== "string") return { message: "Invalid Id " };

   

    await prisma.company.delete({
      where: {
        id,
      },
    
    });

    return { success: "Successfully deleted" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};
