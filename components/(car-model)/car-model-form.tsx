"use client";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ActionLoaderButton from "../action-loader-button";
import { useModal } from "@/hooks/modals-hook/modals.hook";

import { useCarModel } from "@/hooks/(car-model)/car-model.hook";

type Props = {};

const CarModelForm = (props: Props) => {
    const {modalInputs} = useModal()
  const { form, onSubmit } = useCarModel();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model*</FormLabel>
              <FormControl>
                <Input placeholder="model" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
         {(modalInputs?.modal==='carModel' && modalInputs.carModel) ? 'Update' : 'Submit'}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarModelForm;
