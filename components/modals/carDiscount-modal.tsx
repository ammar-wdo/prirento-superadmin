'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"
import CarDiscountForm from "../(car discount)/car-discount-form"



type Props = {}

const CarDiscountModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='carDiscount'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cars discounts</DialogTitle>
        <DialogDescription>
          Manage Cars discounts
        </DialogDescription>
      </DialogHeader>
    <CarDiscountForm/>
    </DialogContent>
  </Dialog>
  )
}

export default CarDiscountModal