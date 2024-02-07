"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { checkLabel, checkSlug } from "@/lib/utils";
import { blogCategorySchema, blogSchema } from "@/schemas";
import { getServerSession } from "next-auth";

export const addBlog = async (data: any) => {
  console.log('hi')
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    const validData = blogSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

   
    await checkSlug(validData.data.slug,'blogCategory')
    const {logo,...rest} = validData.data

    await prisma.blog.create({
      data: {
       
     ...rest,
     featuredImage:logo
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

export const editBlog= async (data: any, id: string) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    if (!id || typeof id !== "string") return { error: "Invalid Id " };

    const validData = blogSchema.safeParse(data);
    if (!validData.success) return { error: "Invalid inputs" };

  
    await checkSlug(validData.data.slug,'blog',id)
    const {logo,...rest} = validData.data
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
       ...rest,
       featuredImage:logo
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


export const deleteBlog= async (id: string) => {
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
