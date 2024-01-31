import ClientModalButton from '@/components/client-modal-button'
import Heading from '@/components/heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <div className='flex items-center justify-between'>
        <Heading title='Discount' description='Manage discounts'/>
        <ClientModalButton modalInputs={{toDelete:false,modal:'carDiscount'}}>Create discount</ClientModalButton>
        </div>
 
    </div>
  )
}

export default page