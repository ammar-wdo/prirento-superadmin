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


import {  Terms } from "@prisma/client"
import ActionLoaderButton from "../action-loader-button"
import dynamic from "next/dynamic"
import { useTerm } from "@/hooks/terms.hook"

const Editor = dynamic(()=>import('@/components/editor'),{ssr:false})

type Props = {
    term:Terms | null
}

const TermsForm = ({term}: Props) => {
    const {form, onSubmit} = useTerm(term)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Terms content</FormLabel>
            <FormControl>
            <Editor onChange={field.onChange} initialContent={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ActionLoaderButton isLoading={form.formState.isSubmitting}>
        {term ? "Update" : "Submit"}
      </ActionLoaderButton>
    </form>
  </Form>
  )
}

export default TermsForm