'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"

import SubLocationForm from "../(sub-location)/sublocation-form"
type Props = {}

const SubLocationModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
  
    const isOpen = open && modalInputs?.modal==='sub-location'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sub-locations</DialogTitle>
        <DialogDescription>
          Manage sub-locations for Prirento
        </DialogDescription>
      </DialogHeader>
      <SubLocationForm />
    </DialogContent>
  </Dialog>
  )
}

export default SubLocationModal