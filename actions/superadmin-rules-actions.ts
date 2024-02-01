"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import { superAdminSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addSuperadminRule = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = superAdminSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.superadminRule.create({
      data: {
        ...validData.data,
        carId: validData.data.carId ? validData.data.carId : null,
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const editSuperadminRule = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "car ID is required" };

    const validData = superAdminSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await prisma.superadminRule.update({
      where: {
        id,
      },
      data: {
        ...validData.data,
        carId: validData.data.carId ? validData.data.carId : null,
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteSuperadminRule = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    await prisma.superadminRule.delete({
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
