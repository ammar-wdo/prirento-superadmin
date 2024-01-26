"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { carModelSchema, categorySchema,  } from "@/schemas";
import { getServerSession } from "next-auth";

export const addCarModel = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    const validData = carModelSchema.safeParse(data);
    if (!validData.success) return { message: "Invalid inputs" };

    await prisma.carModel.create({
      data: {
        name: validData.data.name,
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

export const editCarModel = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    if (!id || typeof id !== "string") return { message: "Invalid Id " };

    const validData = carModelSchema.safeParse(data);
    if (!validData.success) return { message: "Invalid inputs" };

    await prisma.carModel.update({
      where: {
        id,
      },
      data: {
        name: validData.data.name,
      },
    });

    return { success: "Successfully updated" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};


export const deleteCarModel = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { message: "Unauthorized" };

    if (!id || typeof id !== "string") return { message: "Invalid Id " };

   

    await prisma.carModel.delete({
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
