'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals-hook/modals.hook"

import CategoryForm from "../(category)/category-form"
type Props = {}

const CategoryModal = (props: Props) => {

    const {open,type,setClose} = useModal()
    const isOpen = open && type==='category'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Categories</DialogTitle>
        <DialogDescription>
          Manage different categories 
        </DialogDescription>
      </DialogHeader>
      <CategoryForm />
    </DialogContent>
  </Dialog>
  )
}

export default CategoryModal