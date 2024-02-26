"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import {  aboutSchema, faqSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const createFaq = async (data: any) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = faqSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

   
 

    await prisma.faq.create({
      data: {
       
     ...validData.data,
  
      },
    });

    return { success: "Successfully created" };
  } catch (error) {
    let message = 'Something went wrong'
    if(error instanceof Error){
      message = error.message
    }
    console.log(error);
    return { error: message};
  }
};

export const updateFaq= async (data: any,id:string) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

   if(!id) return { error: "FAQ Id is required" }

    const validData = faqSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

  
    await prisma.faq.update({
      where: {
        id,
      },
      data: {
       ...validData.data,
    
      },
    });

    return { success: "Successfully updated" };
  } catch (error) {
    let message = 'Something went wrong'
    if(error instanceof Error){
      message = error.message
    }
    console.log(error);
    return { error: message};
  }
};

export const deleteFaq = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.faq.delete({
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
