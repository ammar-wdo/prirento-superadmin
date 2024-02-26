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
import FaqForm from "../(faq)/faq-form"
type Props = {}

const FaqModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='faq'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>FAQ</DialogTitle>
        <DialogDescription>
          Manage Frequently asked questions
        </DialogDescription>
      </DialogHeader>
     <FaqForm/>
    </DialogContent>
  </Dialog>
  )
}

export default FaqModal