"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { CustomError } from "@/custom-error";
import prisma from "@/lib/prisma";
import { reviewSchema } from "@/schemas";
import { getServerSession } from "next-auth";



export const addReveiw = async (
data:any
): Promise<{ success: boolean; error?: string ,message?:string}> => {
  try {
   
    const session = await getServerSession(authOptions);
    if (!session) throw new CustomError("Unauthorized");

    const validData = reviewSchema.safeParse(data)

    if(!validData.success) return {success:false,error:'Invalid inputs'}

    const review = await prisma.review.create({
data:{
...validData.data
}
    });

return {success:true,message:'Successfully Created'}

  } catch (error) {
    console.log(error);
    let message = "Internal server error";
    if (error instanceof CustomError) message = error.message;
    return { success: false, error: message };
  }
};



export const editReveiw = async (
    id:string,data:any
    ): Promise<{ success: boolean; error?: string ,message?:string}> => {
      try {
       if(!id) return {success:false,error:"Id is required"}
        const session = await getServerSession(authOptions);
        if (!session) throw new CustomError("Unauthorized");
    
        const validData = reviewSchema.safeParse(data)
    
        if(!validData.success) return {success:false,error:'Invalid inputs'}
    
        const review = await prisma.review.update({
            where:{
id
            },
    data:{
    ...validData.data
    }
        });
    
    return {success:true,message:'Successfully Updated'}
    
      } catch (error) {
        console.log(error);
        let message = "Internal server error";
        if (error instanceof CustomError) message = error.message;
        return { success: false, error: message };
      }
    };



    export const deleteReveiw = async (
       id:string
        ) => {
          try {
            if(!id) return {error:"Id is required"}
            const session = await getServerSession(authOptions);
            if (!session) throw new CustomError("Unauthorized");
        
            
        
            
        
          await prisma.review.delete({
            where:{id}
          })
        
        return {success:'Successfully Deleted'}
        
          } catch (error) {
            console.log(error);
            let message = "Internal server error";
            if (error instanceof CustomError) message = error.message;
            return { error: message };
          }
        };
