import FaqFeed from '@/components/(faq)/faq-feed'
import ClientModalButton from '@/components/client-modal-button'
import Heading from '@/components/heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='FAQ' description='Manage frequently asked questions' />
      <ClientModalButton  modalInputs={{modal:'faq',toDelete:false}}>Add element</ClientModalButton>
      </div>

      <div className='mt-12 p-2 rounded-lg bg-white border'>
        <FaqFeed/>
      </div>

    </div>
  )
}

export default page