import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carAvailabilitySchema } from "@/schemas";
import { generateHourlyTimes, getTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useModal } from "./modals.hook";
import { CarAvailability } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  addCarAvailability,
  editCarAvailability,
} from "@/actions/car-availability-actions";

export const useCarAvailability = () => {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const { modalInputs, setClose } = useModal();

  let carAvailability: CarAvailability | undefined;
  if (modalInputs?.modal === "carAvailability") {
    carAvailability = modalInputs.carAvailability;
  }

  const form = useForm<z.infer<typeof carAvailabilitySchema>>({
    resolver: zodResolver(carAvailabilitySchema),
    defaultValues: {
      label: carAvailability?.label || "",
      startDate: carAvailability?.startDate.toISOString().slice(0,10) || "",
      endDate: carAvailability?.endDate.toISOString().slice(0,10) || "",
      startTime: getTime(carAvailability?.startDate) || "",
      endTime: getTime(carAvailability?.endDate) || "",
    },
  });



  const router = useRouter();
  const params = useParams();
 

  async function onSubmit(values: z.infer<typeof carAvailabilitySchema>) {
    try {
      let res;
      if (carAvailability) {
        res = await editCarAvailability(
          values,
          carAvailability.id,
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

  return {
    form,
    onSubmit,
    times,
    startDateOpen,
    endDateOpen,
    setStartDateOpen,
    setEndDateOpen,
  };
};
