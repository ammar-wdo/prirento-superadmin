import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogCategorySchema, categorySchema } from "@/schemas";
import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import {  } from "@/actions/category-actions";
import { BlogCategory } from "@prisma/client";
import { useEffect } from "react";
import { transformSlug } from "@/lib/utils";
import { addBlogCategory, editBlogCategory } from "@/actions/blogs-category-actions";

export const UseBlogCategory = () => {
  const { setClose, modalInputs } = useModal();
  let category : BlogCategory | undefined = undefined
  if(modalInputs?.modal==='blogCategory') category = modalInputs.blogCategory
  const router = useRouter();

  const form = useForm<z.infer<typeof blogCategorySchema>>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      label: category?.label || "",
      slug:category?.slug || ""
    },
  });


  useEffect(()=>{
    const refinedSlug = transformSlug(form.watch('slug'))
    form.setValue('slug',refinedSlug)
  },[form.watch('slug')])

  async function onSubmit(values: z.infer<typeof blogCategorySchema>) {
    console.log(values)
    try {
      let res;
      if (category) {
        console.log(category)
        res = await editBlogCategory(values,category.id);
      } else {
        console.log('hi')
        res = await addBlogCategory(values);
      }

      if (res.error) {
        toast.error(res.error);
      } else {
        router.refresh();
        toast.success(res.success);
        setClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return { form, onSubmit };
};
