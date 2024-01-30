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
import CarAvailabilityForm from "../(car availability)/car-availability-form"
type Props = {}

const CarAvailabilityModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='carAvailability'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Car availability</DialogTitle>
        <DialogDescription>
          Manage your car availability
        </DialogDescription>
      </DialogHeader>
      <CarAvailabilityForm />
    </DialogContent>
  </Dialog>
  )
}

export default CarAvailabilityModal