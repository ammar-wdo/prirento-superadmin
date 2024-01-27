import Heading from '@/components/heading'
import React from 'react'

type Props = {}
export const revalidate = 0
const page = (props: Props) => {
  return (
    <div>
      <Heading title="Yacht" description="Manage yachts" />
    </div>
  )
}

export default page