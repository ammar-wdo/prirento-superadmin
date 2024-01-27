import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/schemas";
import { useModal } from "../modals-hook/modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { addCategory, editCategory } from "@/actions/category-actions";
import { Category } from "@prisma/client";

export const useCategory = () => {
  const { setClose, modalInputs } = useModal();
  let category : Category | undefined = undefined
  if(modalInputs?.modal==='category') category = modalInputs.category
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      let res;
      if (category) {
        res = await editCategory(values,category.id);
      } else {
        res = await addCategory(values);
      }

      if (res.message) {
        toast.error(res.message);
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
