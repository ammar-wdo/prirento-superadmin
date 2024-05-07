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
import { useBlog } from "@/hooks/blog-form.hook"
import { useModal } from "@/hooks/modals.hook"
import { usePushNotifications } from "@/hooks/push-notifications.hook"
import { Input } from "../ui/input"
import { Loader } from "lucide-react"
import { Textarea } from "../ui/textarea"






const PushNotificationsForm = () => {

const {form,onSubmit} = usePushNotifications()







  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
         <Input  placeholder="Notification Title" {...field}/>
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
            <FormLabel>Description</FormLabel>
            <FormControl>
         <Textarea  placeholder="Notification Description" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

   
      <ActionLoaderButton isLoading={form.formState.isSubmitting}>
      Submit
      </ActionLoaderButton>
    </form>
  </Form>
  )
}

export default PushNotificationsForm