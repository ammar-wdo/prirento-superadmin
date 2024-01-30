import prisma from '@/lib/prisma'
import React from 'react'
import NoResult from '../no-result'
import CarAvailabilityCard from './car-availability-card'

type Props = {
    carId:string
}

const CarAvailabilityFeed = async({carId}: Props) => {
    const availabilities = await prisma.carAvailability.findMany({
        where:{
            carId
        }
    })
  return (
    <div>
        {!availabilities.length && <NoResult title='No blocking dates added' />}
        {!!availabilities.length && <div className='mt-12 flex  flex-wrap gap-4'> {availabilities.map(el=><CarAvailabilityCard key={el.id} carAvailability={el}/>)}</div>}
    </div>
  )
}

export default CarAvailabilityFeed