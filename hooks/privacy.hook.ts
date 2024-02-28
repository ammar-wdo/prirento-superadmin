import { createAbout, updateAbout } from "@/actions/about-actions";
import { createPrivacy, updatePrivacy } from "@/actions/privacy-actions";
import { privacySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { About, Privacy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const usePrivacy = (privacy: Privacy | null) => {
  const form = useForm<z.infer<typeof privacySchema>>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      content: privacy?.content || "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof privacySchema>) {
    try {
      let res;
      if (!privacy) {
        res = await createPrivacy(values);
      } else {
        res = await updatePrivacy(values);
      }

      if (!res.success) {
        return toast.error(res.error);
      }

      toast.success(res.success);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return { form, onSubmit };
};
