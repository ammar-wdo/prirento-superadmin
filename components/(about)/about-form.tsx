'use client'


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useAbout } from "@/hooks/about.hook"
import { About } from "@prisma/client"
import ActionLoaderButton from "../action-loader-button"
import dynamic from "next/dynamic"

const Editor = dynamic(()=>import('@/components/editor'),{ssr:false})

type Props = {
    about:About | null
}

const AboutForm = ({about}: Props) => {
    const {form, onSubmit} = useAbout(about)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About content</FormLabel>
            <FormControl>
            <Editor onChange={field.onChange} initialContent={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ActionLoaderButton isLoading={form.formState.isSubmitting}>
        {about ? "Update" : "Submit"}
      </ActionLoaderButton>
    </form>
  </Form>
  )
}

export default AboutForm