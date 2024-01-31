import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carAvailabilitySchema, carDiscountSchema } from "@/schemas";
import { generateHourlyTimes, generatePromoCode, getTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useModal } from "./modals.hook";
import {  CarDiscount } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  addCarAvailability,
  editCarAvailability,
} from "@/actions/car-availability-actions";

export const useCarDiscount = () => {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const { modalInputs, setClose } = useModal();

  let carDiscount: CarDiscount | undefined;
  if (modalInputs?.modal === "carDiscount") {
   carDiscount = modalInputs.carDiscount
  }

  const form = useForm<z.infer<typeof carDiscountSchema>>({
    resolver: zodResolver(carDiscountSchema),
    defaultValues: {
      label: carDiscount?.label || "",
      startDate: carDiscount?.startDate.toISOString().slice(0,10) || "",
      endDate: carDiscount?.endDate.toISOString().slice(0,10) || "",
      startTime: getTime(carDiscount?.startDate) || "",
      endTime: getTime(carDiscount?.endDate) || "",
      discountApplyType:carDiscount?.discountApplyType || 'booked',
    
      promocode:carDiscount?.promocode || '',
      type:carDiscount?.type || 'fixed',
      value:carDiscount?.value || undefined
    },
  });



  const router = useRouter();
  const params = useParams();
 

  async function onSubmit(values: z.infer<typeof carDiscountSchema>) {
    try {
      let res;
      if (carDiscount) {
        res = await editCarAvailability(
          values,
          carDiscount.id,
          params.carId as string
        );
      } else {
        res = await addCarAvailability(values, params.carId as string);
      }
      if (res.error) {
        toast.error(res.error);
      } else {
        router.refresh();
        toast.success(res.success);
        setClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  const times = generateHourlyTimes();

  const generatePromo = ()=>{
    const code = generatePromoCode(9)
    form.setValue('promocode',code)
  }

  return {
    form,
    onSubmit,
    times,
    startDateOpen,
    endDateOpen,
    setStartDateOpen,
    setEndDateOpen,
    generatePromo
  };
};
