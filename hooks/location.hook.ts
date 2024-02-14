import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locationSchema } from "@/schemas";
import { useModal } from "./modals.hook";
import { useRouter } from "next/navigation";
import { addLocation, editLocation } from "@/actions/location-actions";
import { toast } from "sonner";
import { Location } from "@prisma/client";
import { useEffect } from "react";
import { transformSlug } from "@/lib/utils";

export const useLocation = () => {
  const { setClose, modalInputs } = useModal();
  let location:Location | null = null
if(modalInputs?.modal==='location'){
  location = modalInputs?.location!
};


  const router = useRouter();

  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: location?.name || "",
      slug:location?.slug || ""
    },
  });

  useEffect(() => {
    const refinedSlug = transformSlug(form.watch("slug"));
    form.setValue("slug", refinedSlug);
  }, [form.watch("slug")]);

  async function onSubmit(values: z.infer<typeof locationSchema>) {
    try {
      let res;
      if (location) {
        res = await editLocation(values,location.id);
      } else {
        res = await addLocation(values);
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
