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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import ActionLoaderButton from "../action-loader-button";
import { useModal } from "@/hooks/modals.hook";
type Props = {};

const CarAvailabilityForm = (props: Props) => {
  const {
    form,
    onSubmit,
    times,
    startDateOpen,
    endDateOpen,
    setStartDateOpen,
    setEndDateOpen,
  } = useCarAvailability();
  const { modalInputs } = useModal();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="label" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
                        "w-[240px] pl-3 text-left font-normal",
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        "w-[240px] pl-3 text-left font-normal",
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
                    defaultMonth={new Date(form.watch("endDate") || new Date())}
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) => {
                      field.onChange(convertDateToISOString(date));
                      setEndDateOpen(false);
                    }}
                    disabled={(date) =>
                      date <
                      new Date(
                        new Date(form.watch("startDate")).setHours(0, 0, 0, 0)
                      )
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "carAvailability" &&
          modalInputs.carAvailability
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarAvailabilityForm;
