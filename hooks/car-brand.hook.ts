import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { carBrandSchema } from "@/schemas";

import { CarBrand } from "@prisma/client";
import { addCarBrand, editCarBrand } from "@/actions/carBrand-actions";
import { useLogo } from "./logo.hook";

export const useCarBrand = () => {
  const { setClose, modalInputs } = useModal();
  let carBrand: CarBrand | undefined = undefined;
  if (modalInputs?.modal === "carBrand") carBrand = modalInputs.carBrand;

  const router = useRouter();

  const form = useForm<z.infer<typeof carBrandSchema>>({
    resolver: zodResolver(carBrandSchema),
    defaultValues: {
      brand: carBrand?.brand || "",
      logo:carBrand?.logo || ""
      
    },
  });


  const {ImagePlaceholder,file,setFile,uploadImage} = useLogo({form})

  async function onSubmit(values: z.infer<typeof carBrandSchema>) {
    try {
      let res;
      if (carBrand) {
        res = await editCarBrand(values, carBrand.id);
      } else {
        res = await addCarBrand(values);
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

  return { form, onSubmit,ImagePlaceholder,file,setFile,uploadImage };
};
