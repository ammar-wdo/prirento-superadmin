import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locationSchema } from "@/schemas";
import { useModal } from "../modals-hook/modals.hook";
import { useRouter } from "next/navigation";
import { addLocation, editLocation } from "@/actions/location-actions";
import { toast } from "sonner";

export const useLocation = () => {
  const { setClose, data } = useModal();
  const location = data?.location;
  const router = useRouter();

  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: location?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof locationSchema>) {
    try {
      let res;
      if (data?.location) {
        res = await editLocation(values, data?.location.id);
      } else {
        res = await addLocation(values);
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
