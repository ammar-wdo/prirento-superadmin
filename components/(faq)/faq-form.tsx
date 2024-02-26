'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useFaq } from '@/hooks/faq.hook'
import { useModal } from "@/hooks/modals.hook"
import ActionLoaderButton from "../action-loader-button"
import { Textarea } from "../ui/textarea"


type Props = {}

const FaqForm = (props: Props) => {

    const {form, onSubmit} = useFaq()
    const {modalInputs} = useModal()
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Input placeholder="question" {...field} />
            </FormControl>
    
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Answer</FormLabel>
            <FormControl>
              <Textarea placeholder="answer" {...field} />
            </FormControl>
    
            <FormMessage />
          </FormItem>
        )}
      />
      <ActionLoaderButton isLoading={form.formState.isSubmitting} >{(modalInputs?.modal==='faq' && modalInputs.faq) ? 'Update' : 'Create'}</ActionLoaderButton>
    </form>
  </Form>
  )
}

export default FaqForm