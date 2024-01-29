"use client";

import { useLocation } from "@/hooks/location.hook";
import { Button } from "@/components/ui/button";
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
import { useModal } from "@/hooks/modals.hook";
import { useSubLocation } from "@/hooks/sub-location.hook";

type Props = {};

const SubLocationForm = (props: Props) => {
  const { modalInputs } = useModal();

  const { form, onSubmit } = useSubLocation();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-location</FormLabel>
              <FormControl>
                <Input placeholder="Sub-location" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "sub-location" && modalInputs.subLocation
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default SubLocationForm;
