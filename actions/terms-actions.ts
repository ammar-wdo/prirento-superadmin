"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import { termsSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const createTerms = async (data: any) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = termsSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

   
 

    await prisma.terms.create({
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

export const updateTerms= async (data: any) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

   

    const validData = termsSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

  
    await prisma.terms.update({
      where: {
        id:"Terms",
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


