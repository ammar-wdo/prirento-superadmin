'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"


import CarModelForm from "../(car-model)/car-model-form"
type Props = {}

const CarModelModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='carModel'
    const carsBrands = modalInputs?.modal==='carModel' ? modalInputs.carsBrands :[]
    
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cars models</DialogTitle>
        <DialogDescription>
          Manage Cars Models
        </DialogDescription>
      </DialogHeader>
      <CarModelForm carsBrands={carsBrands}/>
    </DialogContent>
  </Dialog>
  )
}

export default CarModelModal