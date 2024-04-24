import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";
import NavigatorButton from "../navigator-button";
import { Delete, Edit } from "lucide-react";
import ClientModalButton from "../client-modal-button";
import { deleteBlog } from "@/actions/blog-actions";

type Props = {
  blog: Blog & { category: { label: string } };
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="w-[300px] border rounded-lg overflow-hidden flex flex-col bg-white">
      <div className="relative aspect-video w-full border-b">
        <Image
          src={blog.featuredImage}
          alt="logo"
          fill
          className="object-cover"
        />
           <p className="absolute top-1 right-1 capitalize bg-black text-white px-4 py-1 rounded-full text-xs">{blog.category.label}</p>
      </div>
      <div className="mt-4 p-4 flex flex-col w-full gap-2">
        <div>
        <h3 className="capitalize font-medium ">{blog.title}</h3>
        <p className="text-sm text-muted-foreground">
          {" "}
          {blog.shortDescription}
        </p>
        </div>
      
     
       
      </div>
<div className="mt-auto p-4 flex flex-col gap-2">
<NavigatorButton
          className="w-full "
          href={`/dashboard/blog/${blog.id}`}
        >
          Edit <Edit className="ml-2 w-4 h-4"/>
        </NavigatorButton>
        <ClientModalButton className="w-full" destructive={true} modalInputs={{toDelete:true,deleteFunction:deleteBlog,deleteId:blog.id,modal:'delete'}}>
          Delete <Delete className="ml-2 w-4 h-4" />
        </ClientModalButton>
</div>
     
    </div>
  );
};

export default BlogCard;
