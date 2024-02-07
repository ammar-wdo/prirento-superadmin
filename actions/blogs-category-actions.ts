"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { checkLabel, checkSlug } from "@/lib/utils";
import { blogCategorySchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addBlogCategory = async (data: any) => {
  console.log('hi')
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = blogCategorySchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkLabel(validData.data.label,'blogCategory')
    await checkSlug(validData.data.slug,'blogCategory')

    await prisma.blogCategory.create({
      data: {
       
        ...validData.data
      },
    });

    return { success: "Successfully added" };
  } catch (error) {
    let message = 'Something went wrong'
    if(error instanceof Error){
      message = error.message
    }
    console.log(error);
    return { error: message};
  }
};

export const editBlogCategory = async (data: any, id: string) => {
  console.log('hi')
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = blogCategorySchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

    await checkLabel(validData.data.label,'blogCategory',id)
    await checkSlug(validData.data.slug,'blogCategory',id)

    await prisma.blogCategory.update({
      where: {
        id,
      },
      data: {
       ...validData.data
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


export const deleteBlogCategory = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

   

    await prisma.blogCategory.delete({
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
