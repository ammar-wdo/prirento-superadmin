"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { areIdsValid, checkSlug, isIdValid } from "@/lib/utils";
import { carBrandSchema, carSchema } from "@/schemas";
import { getServerSession } from "next-auth";





export const addCar = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = carSchema.safeParse(data);
    if (!validData.success) {
      console.log(validData.error);
      return { error: validData.error.message };
    }

    const {
      pickupLocations,
      dropoffLocations,
      pickupSubLocations,
      dropoffSubLocations,
      ...rest
    } = validData.data;

    Promise.all([
      areIdsValid(pickupLocations, "location"),
     areIdsValid(dropoffLocations, "location"),
     areIdsValid(pickupSubLocations, "subLocation"),
     areIdsValid(dropoffSubLocations, "subLocation"),
     isIdValid(rest.companyId, "company"),
     checkSlug(rest.slug,'car')
    ]) 


    await prisma.car.create({
      data: {
        ...rest,
        pickupLocations: { connect: pickupLocations.map((id) => ({ id })) },
        dropoffLocations: { connect: dropoffLocations.map((id) => ({ id })) },
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





export const editCar = async (data: any, id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = carSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    const {
      pickupLocations,
      dropoffLocations,
      pickupSubLocations,
      dropoffSubLocations,
      ...rest
    } = validData.data;

    await Promise.all([
      areIdsValid(pickupLocations, "location"),
      areIdsValid(dropoffLocations, "location"),
      areIdsValid(pickupSubLocations, "subLocation"),
      areIdsValid(dropoffSubLocations, "subLocation"),
      isIdValid(rest.companyId, "company"),
      checkSlug(rest.slug, 'car', id)
    ])

    await prisma.car.update({
      where: {
        id,
      },
      data: {
        ...rest,
        pickupLocations: {
          set: [],
          connect: pickupLocations.map((id) => ({ id })),
        },
        dropoffLocations: {
          set: [],
          connect: dropoffLocations.map((id) => ({ id })),
        },
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






export const deleteCar = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    await prisma.car.delete({
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
