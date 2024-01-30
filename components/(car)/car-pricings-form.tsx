"use client";
import { usePricings } from "@/hooks/car-pricings.hook";
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
import { PlusCircle } from "lucide-react";
import ToolTip from "../tool-tip";
import ActionLoaderButton from "../action-loader-button";

type Props = {
  pricings: number[];
  hourPrice: number | undefined;
  id:string
};

const CarPricingsForm = ({ pricings, hourPrice ,id}: Props) => {
  const { form, onSubmit, setValue, addRow } = usePricings({
    pricings,
    hourPrice,
    id
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
      <FormField
          control={form.control}
          name="hourPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hour price*</FormLabel>
              <FormControl>
                <Input placeholder="Hour price" type="number" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">

       
        <FormField
          control={form.control}
          name="pricings"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Pricings</FormLabel>
                <ToolTip side="top" title="Add new day">
                  <Button
                    variant={"secondary"}
                    type="button"
                    className=""
                    onClick={addRow}
                  >
                    <PlusCircle />
                  </Button>
                </ToolTip>
              </div>

              <FormControl>
                <div className="space-y-2">
                  {form.watch("pricings").map((el, i) => (
                    <div className="flex items-center justify-between">
                      <span className="shrink-0 text-xs font-medium">Day {i+1}</span>
                      <Input
                        key={i}
                        placeholder="0"
                        type="number"
                        className="w-[95%]"
                        {...field}
                        value={el || ""}
                        onChange={(e) => setValue(+e.target.value, i)}
                      />
                    </div>
                  ))}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         </div>
       <ActionLoaderButton className="w-full" isLoading={form.formState.isSubmitting} >Submit</ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarPricingsForm;
