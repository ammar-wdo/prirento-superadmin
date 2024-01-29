"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { companySchema } from "@/schemas";
import { getServerSession } from "next-auth";
import bcrypt from 'bcryptjs';
import { checkEmail, checkSlug, hashPassword } from "@/lib/utils";












export const addCompany = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = companySchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    const {newPassword,...values} = validData.data
    
    const hashedPassword = await hashPassword(values.password);

    await checkEmail(validData.data.email,'company')
    await checkSlug(validData.data.slug,'company')

    await prisma.company.create({
      data: {
        ...values,
        password:hashedPassword
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(error);
    return { error: message };
  }
};














export const editCompany = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = companySchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };
    
    await checkEmail(validData.data.email,'company',id)
    await checkSlug(validData.data.slug,'company',id)

    const { newPassword, password, ...rest } = validData.data;
    
    let thePassword;
    if (newPassword) {
      thePassword =  await hashPassword(newPassword);
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
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(error);
    return { error: message };
  }
};











export const deleteCompany = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.company.delete({
      where: {
        id,
      },
    
    });

    return { success: "Successfully deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
