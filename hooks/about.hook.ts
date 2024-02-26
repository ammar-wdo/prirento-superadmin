import { createAbout, updateAbout } from "@/actions/about-actions";
import { aboutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { About } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useAbout = (about: About | null) => {
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      content: about?.content || "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof aboutSchema>) {
    try {
      let res;
      if (!about) {
        res = await createAbout(values);
      } else {
        res = await updateAbout(values);
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
