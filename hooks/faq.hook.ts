
import { faqSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useModal } from "./modals.hook";
import { createFaq, updateFaq } from "@/actions/faq-actions";

export const useFaq = () => {

    const {modalInputs,setClose} = useModal()

    const faq = modalInputs?.modal==='faq' ? modalInputs.faq : null
  const form = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer:faq?.answer || ""
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof faqSchema>) {
    try {
      let res;
      if (!faq) {
        res = await createFaq(values);
      } else {
        res = await updateFaq(values,faq.id);
      }

      if (!res.success) {
        return toast.error(res.error);
      }

      toast.success(res.success);
      router.refresh();
      setClose()
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return { form, onSubmit };
};
