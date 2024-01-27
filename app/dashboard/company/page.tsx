import CompanyFeed from '@/components/(company)/company-feed'
import Heading from '@/components/heading'
import NaviatorButton from '@/components/navigator-button'
import React from 'react'

type Props = {}

export const revalidate = 0

const page = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title="Company" description="Manage companies" />
      <NaviatorButton title='Create company' href='/dashboard/company/new' />

      </div>

      <div className='mt-12'><CompanyFeed/></div>
   
    </div>
  )
}

export default page