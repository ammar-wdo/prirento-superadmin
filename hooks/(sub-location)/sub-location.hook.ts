import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locationSchema, subLocationSchema } from "@/schemas";
import { useModal } from "../modals-hook/modals.hook";
import { useRouter } from "next/navigation";
import { addLocation, editLocation } from "@/actions/location-actions";
import { toast } from "sonner";
import { addSubLocation, editSubLocation } from "@/actions/sublocations-actions";

export const useSubLocation = () => {
  const { setClose, data ,parentId} = useModal();
  const subLocation = data?.subLocation;
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
