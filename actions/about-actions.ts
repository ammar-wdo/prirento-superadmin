"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import {  aboutSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const createAbout = async (data: any) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = aboutSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

   
 

    await prisma.about.create({
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

export const updateAbout= async (data: any) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

   

    const validData = aboutSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

  
    await prisma.about.update({
      where: {
        id:"About",
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


