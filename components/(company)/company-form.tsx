"use client";

import { useCompany } from "@/hooks/(company)/company.hook";
import { Category, Company } from "@prisma/client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SingleImageDropzone } from "../single-image-dropezone";

import dynamic from "next/dynamic";
import { Checkbox } from "../ui/checkbox";
import ActionLoaderButton from "../action-loader-button";

const Editor = dynamic(() => import("../editor"), { ssr: false });

type Props = { categories: Category[]; company: Company };

const CompanyForm = ({ categories, company }: Props) => {
  const {
    form,
    onSubmit,
    file,
    setFile,
    uploadImage,
    ImagePlaceholder,
    imagesFile,
    setImagesFile,
    ImagesPlaceholder,
    uploadImages,
  } = useCompany({ company });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="company name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail*</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {company ? <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="new password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> :<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />}

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select company's category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((el) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={el.id}
                      value={el.id}
                    >
                      {el.name}
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address*</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number*</FormLabel>
              <FormControl>
                <PhoneInput
                  enableSearch={true}
                  buttonStyle={{ border: "none" }}
                  containerStyle={{
                    borderRadius: "7px",
                    paddingBlock: 3,
                    width: "100%",
                    border: "0.4px #ECECEC solid",
                  }}
                  inputStyle={{
                    border: "none",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  value={form.getValues("phoneNumber")}
                  onChange={(phone) => form.setValue("phoneNumber", phone)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsApp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp number*</FormLabel>
              <FormControl>
                <PhoneInput
                  enableSearch={true}
                  buttonStyle={{ border: "none" }}
                  containerStyle={{
                    borderRadius: "7px",
                    paddingBlock: 3,
                    width: "100%",
                    border: "0.4px #ECECEC solid",
                  }}
                  inputStyle={{
                    border: "none",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  value={form.getValues("whatsApp")}
                  onChange={(phone) => form.setValue("whatsApp", phone)}
                />
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
          name="gallary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add images</FormLabel>
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


<FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="border p-3  rounded-lg ">
              <FormLabel>Terms</FormLabel>
              <FormControl>
                <Editor
                  onChange={(string) => {
                    form.setValue("terms", string);
                  }}
                  initialContent={form.getValues("terms")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="promoted"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
            
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Promoted</FormLabel>
            </FormItem>
          )}
        />

        <ActionLoaderButton   isLoading={form.formState.isSubmitting}>{company ? 'Update' : 'Submit'}</ActionLoaderButton>
 
      </form>
    </Form>
  );
};

export default CompanyForm;
