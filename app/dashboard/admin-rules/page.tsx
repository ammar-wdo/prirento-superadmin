import SuperadminRulesFeed from '@/components/(superadmin rules)/superadmin-rules-feed'
import ClientModalButton from '@/components/client-modal-button'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const page = async(props: Props) => {


  const cars = await prisma.car.findMany({
    include: {
      company: {
        select: {
          name: true,
        },
      },
      carModel: {
        select: { name: true },
      },
    },
  });
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Superadmin rules' description='Manage Prirento additional payment rules'/>
      <ClientModalButton modalInputs={{toDelete:false,modal:'superadminRule',cars}}>Create rule</ClientModalButton>
      </div>
      <div className='mt-12'>
        <SuperadminRulesFeed />
      </div>
   
</div>
  )
}

export default page