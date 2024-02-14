"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { checkSlug } from "@/lib/utils";
import { locationSchema, subLocationSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addSubLocation = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = subLocationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkSlug(validData.data.slug,'sub-location')

    await prisma.subLocation.create({
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

export const editSubLocation = async (data: any, id: string) => {
 
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = subLocationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkSlug(validData.data.slug,'sub-location',id)

    await prisma.subLocation.update({
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


export const deleteSubLocation = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.subLocation.delete({
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
