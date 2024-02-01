import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
 
  superAdminSchema,
} from "@/schemas";

import { useEffect } from "react";
import { toast } from "sonner";
import { useModal } from "./modals.hook";
import {  SuperadminRule } from "@prisma/client";
import {  useRouter } from "next/navigation";

import {
  addCarDiscount,
  editCarDiscount,
} from "@/actions/car-discount-actions";
import { addSuperadminRule, editSuperadminRule } from "@/actions/superadmin-rules-actions";

export const useSuperadminRules = () => {
  const { modalInputs, setClose } = useModal();

  let superAdminRule: SuperadminRule | undefined;
  if (modalInputs?.modal === "superadminRule") {
    superAdminRule = modalInputs.superadminRule;
  }

  const form = useForm<z.infer<typeof superAdminSchema>>({
    resolver: zodResolver(superAdminSchema),
    defaultValues: {
      label: superAdminRule?.label || "",
      description: superAdminRule?.description || "",
      mandatory: superAdminRule?.mandatory,
      carId: superAdminRule?.carId || "all",
      applyToAll: superAdminRule?.applyToAll,
      type: superAdminRule?.type || "fixed",
      value: superAdminRule?.value || undefined,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof superAdminSchema>) {
    try {
      let res;
      if (superAdminRule) {
        res = await editSuperadminRule(values, superAdminRule.id);
      } else {
        res = await addSuperadminRule(values);
      }
      if (res.error) {
        toast.error(res.error);
      } else {
        router.refresh();
        toast.success(res.success);
        setClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    if (form.getValues("carId")) {
      if (form.getValues("carId") === "all") {
        form.setValue("carId", "");
        form.setValue("applyToAll", true);
        console.log(
          "carId",
          form.watch("carId"),
          "apply to all",
          form.watch("applyToAll")
        );
      } else {
        form.setValue("applyToAll", false);
        console.log(
          "carId",
          form.watch("carId"),
          "apply to all",
          form.watch("applyToAll")
        );
      }
    }
  }, [form.watch("carId")]);

  return {
    form,
    onSubmit,
  };
};
