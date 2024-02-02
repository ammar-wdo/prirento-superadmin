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

const CarExtraOptionsModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='carExtraOptions'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Car Extra options</DialogTitle>
        <DialogDescription>
          Manage Car extra options
        </DialogDescription>
      </DialogHeader>
      <CarBrandForm />
    </DialogContent>
  </Dialog>
  )
}

export default CarExtraOptionsModal