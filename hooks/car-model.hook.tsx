import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { addCategory, editCategory } from "@/actions/category-actions";
import { carModelSchema } from "@/schemas";
import { addCarModel, editCarModel } from "@/actions/carModel-actions";
import { CarModel } from "@prisma/client";

export const useCarModel = () => {
  const { setClose, modalInputs } = useModal();
  let carModel: CarModel | undefined = undefined;
  if (modalInputs?.modal === "carModel") carModel = modalInputs.carModel;

  const router = useRouter();

  const form = useForm<z.infer<typeof carModelSchema>>({
    resolver: zodResolver(carModelSchema),
    defaultValues: {
      name: carModel?.name || "",
      carBrandId:carModel?.carBrandId || ""
    },
  });

  async function onSubmit(values: z.infer<typeof carModelSchema>) {
  
    try {
      let res;
      if (carModel) {
        res = await editCarModel(values, carModel.id);
      } else {
        res = await addCarModel(values);
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
