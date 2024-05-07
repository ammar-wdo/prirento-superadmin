'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"



import BlogCategoryForm from "../(blogs category)/blogs-category-form"
import PushNotificationsForm from "../(push notification)/push-notifications-form"
type Props = {}

const PushNotificationsModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='push-notification'
    if(modalInputs?.modal !=='push-notification') return
    const {companyName} = modalInputs
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Push Notification</DialogTitle>
        <DialogDescription>
          Send Push Notifications to <span className="text-black font-semibold">{companyName}</span>
        </DialogDescription>
      </DialogHeader>
     <PushNotificationsForm/>
    </DialogContent>
  </Dialog>
  )
}

export default PushNotificationsModal