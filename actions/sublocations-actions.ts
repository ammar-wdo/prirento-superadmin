"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { locationSchema, subLocationSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addSubLocation = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = subLocationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.subLocation.create({
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

export const editSubLocation = async (data: any, id: string) => {
 
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = subLocationSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.subLocation.update({
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
    return { error: "Something went wrong" };
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
