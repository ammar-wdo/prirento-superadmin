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
import { PlusCircle, Trash } from "lucide-react";
import ToolTip from "../tool-tip";
import ActionLoaderButton from "../action-loader-button";

type Props = {
  pricings: number[];
  hourPrice: number | null;
  id:string
};

const CarPricingsForm = ({ pricings, hourPrice ,id}: Props) => {
  const { form, onSubmit, setValue, addRow ,deleteRow} = usePricings({
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
                    <div    key={i} className="flex items-center justify-between gap-2">
                      <span className="shrink-0 text-xs font-medium">Day {i+1}</span>
                      <div className="flex items-center w-[90%] gap-2">
                      <Input
                     
                        placeholder="0"
                        type="number"
                        className="flex-1"
                        {...field}
                        value={el || ""}
                        onChange={(e) => setValue(+e.target.value, i)}
                      />
                     <ToolTip side="right" title="Delete row"><Button type="button" onClick={()=>deleteRow(i)} variant={'secondary'}><Trash className="w-3 h-3"/></Button></ToolTip> 
                      </div>
                   
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
