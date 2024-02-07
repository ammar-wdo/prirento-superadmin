import { BlogCategory } from "@prisma/client";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { Edit, Trash } from "lucide-react";
import { deleteBlogCategory } from "@/actions/blogs-category-actions";

type Props = {
  category: BlogCategory;
};

const BlogCategoryCard = ({ category }: Props) => {
  return (
    <div className="p-4 border rounded-md bg-white">
      <p className="font-medium capitalize">{category.label}</p>
      <div className="w-full flex items-center gap-1 mt-3">
        <ClientModalButton
          modalInputs={{
            toDelete: false,
            modal: "blogCategory",
            blogCategory: category,
          }}
        >
          <Edit className="w-4 h-4" />
        </ClientModalButton>
        <ClientModalButton
          destructive
          modalInputs={{
            toDelete: true,
            deleteFunction: deleteBlogCategory,
            deleteId: category.id,
            modal: "delete",
          }}
        >
          <Trash className="w-4 h-4" />
        </ClientModalButton>
      </div>
    </div>
  );
};

export default BlogCategoryCard;
