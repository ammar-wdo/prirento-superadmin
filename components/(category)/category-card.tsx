import { Category, Location } from "@prisma/client";
import { Edit2, Trash } from "lucide-react";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { deleteCategory } from "@/actions/category-actions";

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="flex items-center gap-2 border p-3 rounded-md">
      <div className="flex items-center gap-1">
        <ClientModalButton
          modalInputs={{
            toDelete: true,
            deleteFunction: deleteCategory,
            deleteId: category.id,
            modal: "delete",
          }}
          destructive
          small
        >
          <Trash className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
        <ClientModalButton
          small
          modalInputs={{
            modal: "category",
            category: category,
            toDelete: false,
          }}
        >
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
      <p className="text-sm font-medium capitalize">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
