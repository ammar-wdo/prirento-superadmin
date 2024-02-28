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
import { About, Privacy } from "@prisma/client"
import ActionLoaderButton from "../action-loader-button"
import dynamic from "next/dynamic"
import { usePrivacy } from "@/hooks/privacy.hook"

const Editor = dynamic(()=>import('@/components/editor'),{ssr:false})

type Props = {
    privacy:Privacy | null
}

const PrivacyForm = ({privacy}: Props) => {
    const {form, onSubmit} = usePrivacy(privacy)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Privacy content</FormLabel>
            <FormControl>
            <Editor onChange={field.onChange} initialContent={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ActionLoaderButton isLoading={form.formState.isSubmitting}>
        {privacy ? "Update" : "Submit"}
      </ActionLoaderButton>
    </form>
  </Form>
  )
}

export default PrivacyForm