"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { checkSlug } from "@/lib/utils";
import { locationSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addLocation = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = locationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkSlug(validData.data.slug,'location')

    await prisma.location.create({
      data: {
       ...validData.data
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(error);
    return { error: message };
  }
};

export const editLocation = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = locationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkSlug(validData.data.slug,'location',id)

    await prisma.location.update({
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
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(error);
    return { error: message };
  }
};


export const deleteLocation = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.location.delete({
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
