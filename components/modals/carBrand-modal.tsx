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
type Props = {}

const CarBrandModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='carBrand'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cars brands</DialogTitle>
        <DialogDescription>
          Manage Cars brands
        </DialogDescription>
      </DialogHeader>
      <CarBrandForm />
    </DialogContent>
  </Dialog>
  )
}

export default CarBrandModal