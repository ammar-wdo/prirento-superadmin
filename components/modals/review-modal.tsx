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
import ReviewForm from "../(reviews)/review-form"
type Props = {}

const ReviewModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='review'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Review</DialogTitle>
        <DialogDescription>
          Manage Reviews
        </DialogDescription>
      </DialogHeader>
     <ReviewForm/>
    </DialogContent>
  </Dialog>
  )
}

export default ReviewModal