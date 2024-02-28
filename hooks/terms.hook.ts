
import { createTerms, updateTerms } from "@/actions/terms-actions";
import { termsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terms } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useTerm = (term: Terms | null) => {
  const form = useForm<z.infer<typeof termsSchema>>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      content: term?.content || "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof termsSchema>) {
    try {
      let res;
      if (!term) {
        res = await createTerms(values);
      } else {
        res = await updateTerms(values);
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
