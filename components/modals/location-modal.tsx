'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals-hook/modals.hook"
import LocationForm from "../(location)/location-form"
type Props = {}

const LocationModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='location'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Locations</DialogTitle>
        <DialogDescription>
          Manage locations for Prirento
        </DialogDescription>
      </DialogHeader>
      <LocationForm />
    </DialogContent>
  </Dialog>
  )
}

export default LocationModal