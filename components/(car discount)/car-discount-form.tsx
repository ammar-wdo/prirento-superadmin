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
type Props = { cars: (Car & { company: { name: string },carModel:{name:string} })[] };

const CarDiscountForm = ({cars}: Props) => {
  const {
    form,
    onSubmit,
    times,
    startDateOpen,
    endDateOpen,
    setStartDateOpen,
    setEndDateOpen,
    generatePromo,
  } = useCarDiscount();
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
                       
                        value={'all'}
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
          name="promocode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promocode*</FormLabel>
              <FormControl>
                <div className="p-1 flex items-centergap-2 border rounded-md">
                  <Input
                    placeholder="promocode"
                    className="border-0 flex-1 "
                    {...field}
                  />
                  <ToolTip side="top" title="Generate code">
                    <Button type="button" size={"icon"} onClick={generatePromo}>
                      <RefreshCcwDot className="w-5 h-5" />
                    </Button>
                  </ToolTip>
                </div>
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
          name="discountApplyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount apply type*</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select discount apply type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {discountApplyType.map((type) => (
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
        <div className="flex  gap-3 items-start">
          <div className="grid flex-1 grid-cols-1 gap-3 w-fit">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Start Date</FormLabel>
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger className="mt-0" asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        defaultMonth={
                          new Date(form.watch("startDate") || new Date())
                        }
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(convertDateToISOString(date));
                          setStartDateOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Start time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {times.map((time, i) => (
                        <SelectItem
                          className="cursor-pointer text-center"
                          key={i}
                          value={time}
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 w-fit flex-1">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>End date</FormLabel>
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger className="mt-0" asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        defaultMonth={
                          new Date(form.watch("endDate") || new Date())
                        }
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(convertDateToISOString(date));
                          setEndDateOpen(false);
                        }}
                        disabled={(date) =>
                          date <
                            new Date(
                              new Date(form.watch("startDate")).setHours(
                                0,
                                0,
                                0,
                                0
                              )
                            ) ||
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>End time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {times.map((time, i) => (
                        <SelectItem
                          className="cursor-pointer text-center"
                          key={i}
                          value={time}
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "carDiscount" && modalInputs.carDiscount
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarDiscountForm;
