"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,

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

import ActionLoaderButton from "../action-loader-button";
import { useModal } from "@/hooks/modals.hook";
import { useCarExtraOptions } from "@/hooks/car-extra-options.hook";
import { Textarea } from "../ui/textarea";
import { carExtraOptionStatus } from "@/schemas";
import { SingleImageDropzone } from "../single-image-dropezone";
type Props = {};

const CarExtraOptionsForm = (props: Props) => {
  const { form, onSubmit,file,setFile,uploadImage,ImagePlaceholder } = useCarExtraOptions();
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price*</FormLabel>
              <FormControl>
                <Input placeholder="price" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Toggle status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carExtraOptionStatus.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize cursor-pointer"
                    >
                      {status}
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo*</FormLabel>
              <div className="flex items-center gap-3 w-full flex-wrap">
                <FormControl>
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    value={file}
                    onChange={(file) => {
                      setFile(file);
                    }}
                  />
                </FormControl>
                <Button
                  disabled={!file || !!form.watch("logo")}
                  type="button"
                  onClick={uploadImage}
                >
                  Upload
                </Button>
              </div>
              <ImagePlaceholder />

              <FormMessage />
            </FormItem>
          )}
        />

        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
          {modalInputs?.modal === "carExtraOptions" &&
          modalInputs.carExtraOption
            ? "Update"
            : "Submit"}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarExtraOptionsForm;
