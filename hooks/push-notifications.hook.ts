import { createAbout, updateAbout } from "@/actions/about-actions";
import { aboutSchema, pushNotificationsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { About } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useModal } from "./modals.hook";
import { createPushNotifications } from "@/actions/pushNotifications-actions";

export const usePushNotifications = () => {


    const {modalInputs,setClose} = useModal()

 

 const companyId = modalInputs?.modal ==='push-notification' ? modalInputs.companyId : undefined
 const expoPushNotificationId = modalInputs?.modal ==='push-notification' ? modalInputs.expoPushNotificationId : undefined
  const form = useForm<z.infer<typeof pushNotificationsSchema>>({
    resolver: zodResolver(pushNotificationsSchema),
    defaultValues: {
      companyId,
      expoPushNotificationId
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof pushNotificationsSchema>) {
    try {
      let res;
      if (!expoPushNotificationId) {
        alert('for all');
      } else {
        res = await createPushNotifications(values);
      }

      if (!res?.success) {
        return toast.error(res?.error);
      }
setClose()
      toast.success(res.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return { form, onSubmit };
};
