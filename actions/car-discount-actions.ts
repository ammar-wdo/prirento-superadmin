"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { combineDateAndTimeToUTC } from "@/lib/utils";
import { carAvailabilitySchema, carDiscountSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addCarDiscount = async (data: any) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = carDiscountSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    const { startDate, endDate, startTime, endTime, ...rest } = validData.data;
    const startDateObject = combineDateAndTimeToUTC(startDate, startTime);
    const endDateObject = combineDateAndTimeToUTC(endDate, endTime);

// check if exists
    const existPromocode = await prisma.carDiscount.findUnique({
      where:{
        promocode:rest.promocode
      }
    })
    if(existPromocode) return {error:'Promocode exists already'}

    await prisma.carDiscount.create({
      data: {
        ...rest,
        carId: rest.carId ? rest.carId : null, 
        startDate: startDateObject,
        endDate: endDateObject,
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const editCarDiscount = async (
  data: any,
  id: string,
 
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "car ID is required" };

    const validData = carDiscountSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

  

    const { startDate, endDate, startTime, endTime,...rest } = validData.data;
    const startDateObject = combineDateAndTimeToUTC(startDate, startTime);
    const endDateObject = combineDateAndTimeToUTC(endDate, endTime);
    console.log("carId",rest.carId || 'undefiend')

    // check if exists
    const existPromocode = await prisma.carDiscount.findUnique({
      where:{
        promocode:rest.promocode,
        NOT:{id:id}
      }
    })
    if(existPromocode) return {error:'Promocode exists already'}

    await prisma.carDiscount.update({
      where: {
        id,
   
      },
      data: {
        ...rest,
        carId: rest.carId ? rest.carId : null, 

        startDate: startDateObject,
        endDate: endDateObject,
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteCarDiscount = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    await prisma.carDiscount.delete({
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
