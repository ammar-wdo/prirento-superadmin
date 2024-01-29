"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { carBrandSchema, carModelSchema, categorySchema,  } from "@/schemas";
import { getServerSession } from "next-auth";

export const addCarBrand = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = carBrandSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.carBrand.create({
      data: {
       ...validData.data
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const editCarBrand = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = carBrandSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.carBrand.update({
      where: {
        id,
      },
      data: {
       ...validData.data
      },
    });

    return { success: "Successfully updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};


export const deleteCarBrand = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.carBrand.delete({
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
