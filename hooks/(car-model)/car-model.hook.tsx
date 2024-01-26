import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "../modals-hook/modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { addCategory, editCategory } from "@/actions/category-actions";
import { carModelSchema } from "@/schemas";
import { addCarModel, editCarModel } from "@/actions/carModel-actions";

export const useCarModel = () => {
  const { setClose, data } = useModal();
  const carModel = data?.carModel;
  const router = useRouter();

  const form = useForm<z.infer<typeof carModelSchema>>({
    resolver: zodResolver(carModelSchema),
    defaultValues: {
      name: carModel?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof carModelSchema>) {
    try {
      let res;
      if (data?.carModel) {
        res = await editCarModel(values, data?.carModel.id);
      } else {
        res = await addCarModel(values);
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
