import prisma from '@/lib/prisma'
import React from 'react'
import NoResult from '../no-result'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatDate } from '@/lib/utils'
import ClientModalButton from '../client-modal-button'
import { deleteCarAvailability } from '@/actions/car-availability-actions'

type Props = {
    carId:string
}

const CarAvailabilityFeed = async({carId}: Props) => {
    const availabilities = await prisma.carAvailability.findMany({
        where:{
            carId
        },orderBy:{createdAt:'desc'}
    })
  return (
    <div>
        {!availabilities.length && <NoResult title='No blocking dates added' />}
        {!!availabilities.length && <div className='bg-white  mt-12 border rounded-md'><Table >
 
  <TableHeader>
    <TableRow>
      <TableHead className="">Label</TableHead>
      <TableHead>Start date</TableHead>
      <TableHead>End date</TableHead>
      <TableHead>Actions</TableHead>
    
    </TableRow>
  </TableHeader>
  <TableBody>
 {availabilities.map(availability=>   <TableRow key={availability.id}>
      <TableCell className="font-medium">{availability.label || "N/A"}</TableCell>
      <TableCell>{formatDate(availability.startDate)}</TableCell>
      <TableCell>{formatDate(availability.endDate)}</TableCell>
      <TableCell className="text-right"><div className='flex items-center gap-2'>
      <ClientModalButton
     
        modalInputs={{
          toDelete: false,
          carAvailability: availability,
          modal: "carAvailability",
        }}
      >
        Edit
      </ClientModalButton>
      <ClientModalButton
   
        destructive
        modalInputs={{
          toDelete: true,
          modal: "delete",
          deleteId: availability.id,
          deleteFunction: deleteCarAvailability,
        }}
      >
        Delete
      </ClientModalButton>
        </div></TableCell>
    </TableRow>)}
  </TableBody>
</Table></div>}
    </div>
    
  )
}

export default CarAvailabilityFeed



