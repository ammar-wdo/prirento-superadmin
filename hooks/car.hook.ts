import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {  carSchema } from "@/schemas";

import { Car } from "@prisma/client";
import { useGallary } from "./gallary.hook";
import { addCar, editCar } from "@/actions/car-actions";

export const useCar = (
  car : Car & {
    pickupLocations: { id: string }[];
    dropoffLocations: { id: string }[];
    pickupSubLocations:{id:string}[];
    dropoffSubLocations:{id:string}[]
  } | null
) => {
  const router = useRouter();
  const usedPickups = car?.pickupLocations.map((el) => el.id);
  const usedDropoffs = car?.dropoffLocations.map((el) => el.id);
  const usedSubPickups = car?.pickupSubLocations.map((el) => el.id);
  const usedSubDropoffs = car?.dropoffSubLocations.map((el) => el.id);


  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      additionalFeatures: (car?.additionalFeatures || []) as {
        title: string;
        icon: string;
      }[],
      carModelId: car?.carModelId || "",
      carStatus: car?.carStatus || "",
      carType: car?.carType || "",
      colors: car?.colors || "",
      commession: car?.commession! || undefined,
      companyId: car?.companyId || "",
      coolDown: car?.coolDown || undefined,
      deleviryFee: car?.deleviryFee || undefined,
      deposite: car?.deposite || undefined,
      description: car?.description || "",
      disabled: car?.disabled || false,
      doors: car?.doors || undefined,
      electric: car?.electric || "",
      engine: car?.engine || "",
      gallary: car?.gallary || [],
      hourPrice: car?.hourPrice || undefined,
      interiorColor: car?.interiorColor || "",
      kmIncluded: car?.kmIncluded || undefined,
      minimumHours: car?.minimumHours || undefined,
      pricings: car?.pricings || [],
      reservationFlatFee: car?.reservationFlatFee || undefined,
      reservationPercentage: car?.reservationPercentage || undefined,
      seats: car?.seats || undefined,
      transmition: car?.transmition || "",
      year: car?.year || "",
      pickupLocations: usedPickups || [],
      dropoffLocations: usedDropoffs || [],
      pickupSubLocations:usedSubPickups || [],
      dropoffSubLocations:usedSubDropoffs || []

    },
  });

  const {ImagesPlaceholder,imagesFile,setImagesFile,uploadImages} = useGallary({form})

  async function onSubmit(values: z.infer<typeof carSchema>) {
    try {
      let res;
      if (car) {
        res = await editCar(values, car.id);
      } else {
        res = await addCar(values);
      }

      if (res.error) {
        console.log(res.error)
        toast.error(res.error);
      } else {
        router.push("/dashboard/car");
        router.refresh();
        toast.success(res.success);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return { form, onSubmit,ImagesPlaceholder,imagesFile,setImagesFile,uploadImages };
};
