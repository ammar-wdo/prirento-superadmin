import PrivacyForm from '@/components/(privacy)/privacy-form'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const page =async (props: Props) => {

    const privacy = await prisma.privacy.findUnique({
        where:{
            id:'Privacy'
        }
    })
  return (
    <div>
        <Heading title='Privacy Policy' description='Manage Privacy Policy' />

        <div className='mt-12'>
            <PrivacyForm privacy={privacy}/>
        </div>
    </div>
  )
}

export default page