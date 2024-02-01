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
import { useModal } from "@/hooks/modals.hook";

import { useCarModel } from "@/hooks/car-model.hook";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { carsBrands: { id: string; brand: string }[] };

const CarModelForm = ({ carsBrands }: Props) => {
  const { modalInputs } = useModal();
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
                <Input placeholder="model" {...field} className="capitalize"/>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carBrandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Choose car brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carsBrands.map((brand) => (
                    <SelectItem
                      className="capitalize font-medium cursor-pointer"
                      key={brand.id}
                      value={brand.id}
                    >
                      {brand.brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "carModel" && modalInputs.carModel
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarModelForm;
