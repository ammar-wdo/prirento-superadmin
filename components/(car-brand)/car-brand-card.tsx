import { CarBrand } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import ClientModalButton from '../client-modal-button'
import { deleteCarBrand } from '@/actions/carBrand-actions'
import { Edit2, Trash } from 'lucide-react'

type Props = {
    carBrand:CarBrand
}

const CarBrandCard = ({carBrand}: Props) => {
  return (
    <div key={carBrand.id} className="p-3 border rounded-md flex flex-col min-w-[200px] bg-white">
    <div className="relative aspect-video">
        <Image src={carBrand.logo} fill alt="logo"  className='object-contain'/>
    </div>
    <h3 className='py-2 font-medium capitalize text-sm text-muted-foreground'>{carBrand.brand}</h3>
    <div className="flex items-center gap-1 mt-auto">
<ClientModalButton
className='w-full'
  modalInputs={{
    toDelete: true,
    deleteFunction: deleteCarBrand,
    deleteId: carBrand.id,
    modal: "delete",
  }}
  destructive
  small
>
  <Trash className="w-3 h-3 cursor-pointer" />{" "}
</ClientModalButton>
<ClientModalButton className='w-full' small modalInputs={{toDelete:false,modal:'carBrand',carBrand}}>
  <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
</ClientModalButton>
</div>
 </div>
  )
}

export default CarBrandCard