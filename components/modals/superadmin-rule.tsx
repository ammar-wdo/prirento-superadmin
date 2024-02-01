'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modals.hook"

import SuperadminRulesForm from "../(superadmin rules)/superadmin-rules-form"



type Props = {}

const SuperadminRulesModal = (props: Props) => {

    const {open,modalInputs,setClose} = useModal()
    const isOpen = open && modalInputs?.modal==='superadminRule'

    const cars = modalInputs?.modal==='superadminRule' ? modalInputs.cars :[]
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Superadmin rules</DialogTitle>
        <DialogDescription>
          Manage Prirento additional payment rules
        </DialogDescription>
      </DialogHeader>
    <SuperadminRulesForm cars={cars}/>
    </DialogContent>
  </Dialog>
  )
}

export default SuperadminRulesModal