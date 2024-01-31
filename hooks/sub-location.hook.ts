import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locationSchema, subLocationSchema } from "@/schemas";
import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";
import { addLocation, editLocation } from "@/actions/location-actions";
import { toast } from "sonner";
import { addSubLocation, editSubLocation } from "@/actions/sublocations-actions";
import { SubLocation } from "@prisma/client";

export const useSubLocation = () => {
  const { setClose,  modalInputs} = useModal();


let subLocation:SubLocation | undefined = undefined
let parentId:string = ''

if(modalInputs?.modal==='sub-location'){
  subLocation = modalInputs.subLocation
  parentId = modalInputs.parentId as string
}


  const router = useRouter();

  const form = useForm<z.infer<typeof subLocationSchema>>({
    resolver: zodResolver(subLocationSchema),
    defaultValues: {
      name: subLocation?.name || "",
      locationId:parentId
    },
  });

  async function onSubmit(values: z.infer<typeof subLocationSchema>) {
    try {
       
      let res;
      if (subLocation) {
      
        res = await editSubLocation(values, subLocation?.id);
      } else {
        res = await addSubLocation(values);
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
