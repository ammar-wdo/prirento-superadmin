"use client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCarAvailability } from "@/hooks/car-availability.hook";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, convertDateToISOString } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, RefreshCcwDot } from "lucide-react";
import { Calendar } from "../ui/calendar";
import ActionLoaderButton from "../action-loader-button";
import { useModal } from "@/hooks/modals.hook";
import { useCarDiscount } from "@/hooks/carDiscount.hook";
import ToolTip from "../tool-tip";
import { discountApplyType, discountType } from "@/schemas";
import { Car } from "@prisma/client";
import { useSuperadminRules } from "@/hooks/superadmin-rules.hook";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
type Props = {
  cars: (Car & { company: { name: string }; carModel: { name: string } })[];
};

const SuperadminRulesForm = ({ cars }: Props) => {
  const { form, onSubmit } = useSuperadminRules();
  const { modalInputs } = useModal();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="label" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carId"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Choose a car (optional)</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a car" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      className="capitalize cursor-pointer "
                      value={"all"}
                    >
                      All cars
                    </SelectItem>
                    {cars.map((car) => (
                      <SelectItem
                        className="capitalize cursor-pointer "
                        key={car.id}
                        value={car.id}
                      >
                        <div className="flex items-center justify-between w-[300px] text-xs capitalize">
                          <span>{car.carModel.name}</span>
                          <span>{car.company.name}-Company</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type*</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {discountType.map((type) => (
                      <SelectItem
                        className="capitalize cursor-pointer"
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disount value*</FormLabel>
              <FormControl>
                <Input type="number" placeholder="value" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="mandatory"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Mandatory rule
                </FormLabel>
                <FormDescription>
                  If checked, it will appear in all car's checkout.
             
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "superadminRule" && modalInputs.superadminRule
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default SuperadminRulesForm;
