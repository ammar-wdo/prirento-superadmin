'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"


import CarBrandForm from "../(car-brand)/car-brand-form"
import BlogCategoryForm from "../(blogs category)/blogs-category-form"
type Props = {}

const BlogCategoryModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='blogCategory'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Category</DialogTitle>
        <DialogDescription>
          Manage Blog&apos;s categories
        </DialogDescription>
      </DialogHeader>
      <BlogCategoryForm />
    </DialogContent>
  </Dialog>
  )
}

export default BlogCategoryModal