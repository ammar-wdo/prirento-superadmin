import AboutForm from '@/components/(about)/about-form'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const page = async(props: Props) => {

  const about = await prisma.about.findUnique({
    where:{
      id:"About"
    }
  })


  
  return (
    <div>
        <Heading title='About' description='Manage about section'/>

        <div className='mt-12'>
          <AboutForm about={about}/>
            
        </div>
    </div>
  )
}

export default page