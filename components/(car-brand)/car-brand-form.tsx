"use client";


import {
  Form,
  FormControl,
 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ActionLoaderButton from "../action-loader-button";
import { useModal } from "@/hooks/modals.hook";


import { useCarBrand } from "@/hooks/car-brand.hook";
import { SingleImageDropzone } from "../single-image-dropezone";
import { Button } from "../ui/button";

type Props = {};

const CarBrandForm = (props: Props) => {
    const {modalInputs} = useModal()
  const { form, onSubmit,ImagePlaceholder,file,setFile,uploadImage } = useCarBrand();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand*</FormLabel>
              <FormControl>
                <Input placeholder="model" {...field} />
              </FormControl>

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
         {(modalInputs?.modal==='carBrand' && modalInputs.carBrand) ? 'Update' : 'Submit'}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CarBrandForm;
