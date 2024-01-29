"use client";

import { useCar } from "@/hooks/car.hook";
import { Car, Location } from "@prisma/client";
import React from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  carColors,
  carColorsMapper,
  carStatus,
  carTypes,
  electric,
  transmition,
} from "@/schemas";
import { SingleImageDropzone } from "../single-image-dropezone";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

type Props = {
  car:
    | (Car & {
        pickupLocations: { id: string }[];
        dropoffLocations: { id: string }[];
        pickupSubLocations: { id: string }[];
        dropoffSubLocations: { id: string }[];
      })
    | null;

  locations: (Location & { subLocations: { id: string; name: string }[] })[];
  models: { id: string; name: string }[];
  companies: { id: string; name: string }[];
};

const CarForm = ({ car, locations, models, companies }: Props) => {
  const {
    form,
    onSubmit,
    imagesFile,
    setImagesFile,
    uploadImages,
    ImagesPlaceholder,
  } = useCar(car);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Company (owner)*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose car company" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem
                      id={company.id}
                      value={company.id}
                      className=" cursor-pointer capitalize"
                    >
                      {company.name}
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
          name="carModelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Model*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose car model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem
                      id={model.id}
                      value={model.id}
                      className=" cursor-pointer capitalize"
                    >
                      {model.name}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrition*</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="years"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year*</FormLabel>
              <FormControl>
                <Input placeholder="Year, YYYY" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car color*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose car color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carColors.map((color) => (
                    <SelectItem
                      id={color}
                      value={color}
                      className=" cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-[200px]">
                        <span>
                          {color}
                          {}
                        </span>
                        {color !== "Other" && (
                          <span
                            style={{
                              backgroundColor: `${
                                (carColorsMapper as { [key: string]: string })[
                                  color
                                ]
                              }`,
                            }}
                            className="w-6 h-6 border rounded-full  "
                          />
                        )}
                      </div>
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
          name="interiorColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car interior color*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose car interior color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carColors.map((color) => (
                    <SelectItem
                      id={color}
                      value={color}
                      className=" cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-[200px]">
                        <span>
                          {color}
                          {}
                        </span>
                        {color !== "Other" && (
                          <span
                            style={{
                              backgroundColor: `${
                                (carColorsMapper as { [key: string]: string })[
                                  color
                                ]
                              }`,
                            }}
                            className="w-6 h-6 border rounded-full  "
                          />
                        )}
                      </div>
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
          name="seats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seats*</FormLabel>
              <FormControl>
                <Input placeholder="car seats" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doors*</FormLabel>
              <FormControl>
                <Input placeholder="car doors" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="engine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine*</FormLabel>
              <FormControl>
                <Input placeholder="car engine" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kmIncluded"
          render={({ field }) => (
            <FormItem>
              <FormLabel>km Included*</FormLabel>
              <FormControl>
                <Input placeholder="km Included" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car type*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose car type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carTypes.map((type) => (
                    <SelectItem
                      id={type}
                      value={type}
                      className=" cursor-pointer capitalize"
                    >
                      {type}
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
          name="gallary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gallary*</FormLabel>
              <div className="flex items-center gap-3 w-full flex-wrap">
                <FormControl>
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    value={imagesFile}
                    onChange={(imagesFile) => {
                      setImagesFile(imagesFile);
                    }}
                  />
                </FormControl>
                <Button
                  disabled={!imagesFile}
                  type="button"
                  onClick={uploadImages}
                >
                  Upload
                </Button>
              </div>
              <ImagesPlaceholder />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transmition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmition*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose transmition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transmition.map((el) => (
                    <SelectItem
                      id={el}
                      value={el}
                      className=" cursor-pointer capitalize"
                    >
                      {el}
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
          name="electric"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Electric*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose electric satus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {electric.map((el) => (
                    <SelectItem
                      id={el}
                      value={el}
                      className=" cursor-pointer capitalize"
                    >
                      {el}
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
          name="carStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carStatus.map((el) => (
                    <SelectItem
                      id={el}
                      value={el}
                      className=" cursor-pointer capitalize"
                    >
                      {el}
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
          name="deposite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposite*</FormLabel>
              <FormControl>
                <Input placeholder="deposite" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commession*</FormLabel>
              <FormControl>
                <Input placeholder="commession" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col  lg:flex-row gap-4">
          <FormField
            control={form.control}
            name="reservationFlatFee"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Reservation Flat Fee</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Reservation Flat Fee"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <span className=" self-center mt-6">or</span>
          <FormField
            control={form.control}
            name="reservationPercentage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Reservation Percentage</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Reservation Percentage"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      form.trigger("reservationFlatFee");
                    }}
                    type="number"
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deleviryFee"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Deleviry Fee*</FormLabel>
              <FormControl>
                <Input placeholder="Deleviry Fee" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimumHours"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Minimum rental hours</FormLabel>
              <FormControl>
                <Input
                  placeholder="Minimum rental hours"
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coolDown"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Cool Down time (hours)*</FormLabel>
              <FormControl>
                <Input placeholder="Cool Down" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourPrice"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Price per hour*</FormLabel>
              <FormControl>
                <Input placeholder="Price per hour" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Disable your car</FormLabel>
                <FormDescription>
                  If checked, the car will not show on the website.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="pickupLocations"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Pickup locations*</FormLabel>
              </div>
              {locations.map((location) => (
                <FormField
                  key={location.id}
                  control={form.control}
                  name="pickupLocations"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={location.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(location.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, location.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== location.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal capitalize">
                          {location.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="dropoffLocations"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Dropoff locations*</FormLabel>
              </div>
              {locations.map((location) => {


               return <FormField
                  key={location.id}
                  control={form.control}
                  name="dropoffLocations"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={location.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(location.id) || form.watch('pickupLocations').includes(location.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, location.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== location.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal capitalize">
                          {location.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              })}
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          Submit
        </ActionLoaderButton>
    
      </form>
    </Form>
  );
};

export default CarForm;
