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

import { UseBlogCategory } from "@/hooks/blog-category.hook";

type Props = {};

const BlogCategoryForm = (props: Props) => {
    const {modalInputs} = useModal()
  const { form, onSubmit } = UseBlogCategory();
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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug*</FormLabel>
              <FormControl>
                <Input placeholder="slug" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>
         {(modalInputs?.modal==='blogCategory' && modalInputs.blogCategory)? 'Update' : 'Submit'}
        </ActionLoaderButton>
      </form>
    </Form>
  );
};

export default BlogCategoryForm;
