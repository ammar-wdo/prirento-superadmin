"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { CustomError } from "@/custom-error";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const toggleReview = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!id) throw new CustomError("Id is required");
    const session = await getServerSession(authOptions);
    if (!session) throw new CustomError("Unauthorized");

    const review = await prisma.review.findUnique({
      where: {
        id,
      },select:{
        status:true
      }
    });

const isActive = review?.status==='ACTIVE'

await prisma.review.update({
    where:{
        id
    },
    data:{
        status:isActive ? 'PENDING' : 'ACTIVE'
    }
})
return {success:true}

  } catch (error) {
    console.log(error);
    let message = "Internal server error";
    if (error instanceof CustomError) message = error.message;
    return { success: false, error: message };
  }
};
