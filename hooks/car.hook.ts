import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { addCategory, editCategory } from "@/actions/category-actions";
import { carModelSchema, carSchema } from "@/schemas";
import { addCarModel, editCarModel } from "@/actions/carModel-actions";
import { Car } from "@prisma/client";
import { useGallary } from "./gallary.hook";

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
      years: car?.year || "",
      pickupLocations: usedPickups || [],
      dropoffLocations: usedDropoffs || [],
      pickupSubLocations:usedSubPickups || [],
      dropoffSubLocations:usedSubDropoffs || []

    },
  });

  const {ImagesPlaceholder,deleteImagesLoader,deleteanImage,imagesFile,imagesLoader,setImagesFile,uploadImages} = useGallary({form})

  async function onSubmit(values: z.infer<typeof carSchema>) {
    alert(JSON.stringify(values))
    // try {
    //   let res;
    //   if (car) {
    //     res = await editCarModel(values, car.id);
    //   } else {
    //     res = await addCarModel(values);
    //   }

    //   if (res.error) {
    //     toast.error(res.error);
    //   } else {
    //     router.push("/dashboard/car");
    //     router.refresh();
    //     toast.success(res.success);
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
  }

  return { form, onSubmit,ImagesPlaceholder,imagesFile,setImagesFile,uploadImages };
};
