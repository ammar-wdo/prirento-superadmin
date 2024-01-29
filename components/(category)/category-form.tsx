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
import { useCategory } from "@/hooks/category.hook";

type Props = {};

const CategoryForm = (props: Props) => {
    const {modalInputs} = useModal()
  const { form, onSubmit } = useCategory();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="category" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
         {(modalInputs?.modal==='category' && modalInputs.category)? 'Update' : 'Submit'}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default CategoryForm;
