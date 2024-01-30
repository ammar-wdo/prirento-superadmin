"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { combineDateAndTimeToUTC } from "@/lib/utils";
import { carAvailabilitySchema, carModelSchema, categorySchema,  } from "@/schemas";
import { getServerSession } from "next-auth";

export const addCarAvailability = async (data: any,carId:string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if(!carId || typeof carId !== 'string') return {error:'car ID is required'}

    const validData = carAvailabilitySchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    const carExist = await prisma.car.findUnique({
      where:{
        id:carId,
        
      },select:{id:true}
    })
    if(!carExist) return {error:'Car does not exist'}

    const {startDate,endDate,startTime,endTime} = validData.data
    const startDateObject = combineDateAndTimeToUTC(startDate,startTime)
    const endDateObject = combineDateAndTimeToUTC(endDate,endTime)

    await prisma.carAvailability.create({
      data: {
       ...validData.data,
       carId,
       startTime,
       endTime,
       startDate:startDateObject,
       endDate:endDateObject
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const editCarAvailability = async (data: any,id:string, carId: string) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) return { error: "Unauthorized" };
  
      if(!id || typeof id !== 'string') return {error:'car ID is required'}
  
      const validData = carAvailabilitySchema.safeParse(data);
      if (!validData.success) return { error: "Invalid inputs" };

      const carExist = await prisma.car.findUnique({
        where:{
          id:carId
        },select:{id:true}
      })
      if(!carExist) return {error:'Car does not exist'}
  
      const {startDate,endDate,startTime,endTime} = validData.data
      const startDateObject = combineDateAndTimeToUTC(startDate,startTime)
      const endDateObject = combineDateAndTimeToUTC(endDate,endTime)
  
      await prisma.carAvailability.update({
        where:{
            id
        },
        data: {
         ...validData.data,
         carId:carId,
         startTime,
         endTime,
         startDate:startDateObject,
         endDate:endDateObject
        },
      });
  
      return { success: "Successfully added" };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong" };
    }
  };


export const deleteCarAvailability = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.carAvailability.delete({
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
