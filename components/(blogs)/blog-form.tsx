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
import { Input } from "@/components/ui/input";
import { useBlog } from "@/hooks/blog-form.hook";
import { Blog } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageDropzone } from "../single-image-dropezone";
import dynamic from "next/dynamic";
import { XIcon } from "lucide-react";
import ActionLoaderButton from "../action-loader-button";
const Editor = dynamic(() => import("../editor"), { ssr: false });

type Props = {
  blog: Blog | null;
  blogCategories: { label: string; id: string }[];
};

const BlogForm = ({ blog, blogCategories }: Props) => {
  const {
    ImagePlaceholder,
    file,
    form,
    onSubmit,
    setFile,
    uploadImage,
    inputRef,
    addTag,
    removeTag,
  } = useBlog({ blog });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author*</FormLabel>
              <FormControl>
                <Input placeholder="author" {...field} />
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
                <Input placeholder="author" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {blogCategories.map((cat) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.label}
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
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description*</FormLabel>
              <FormControl>
                <Input placeholder="author" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>

              <FormControl>
                <div>
                  <div className="flex items-center gap-3">
                    <Input placeholder="tags" ref={inputRef} />
                    <Button onClick={addTag} type="button">
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap w-full mt-2">
                    {field.value.map((val) => (
                      <span className="border rounded-sm px-3 py-1 flex items-center gap-1 text-xs font-medium capitalize" key={val}>
                        <XIcon className="w-4 h-4 cursor-pointer" onClick={()=>removeTag(val)}/>
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
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

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="border p-3  rounded-lg ">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  onChange={(string) => {
                    form.setValue("content", string);
                  }}
                  initialContent={form.getValues("content")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ActionLoaderButton isLoading={form.formState.isSubmitting}>{blog ? 'Update' : 'Submit'}</ActionLoaderButton>
      </form>
    </Form>
  );
};

export default BlogForm;
