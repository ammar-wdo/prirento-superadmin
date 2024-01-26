import CompanyForm from '@/components/(company)/company-form'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
  params:{companyId:string}
}

const page = async({params}: Props) => {
  const companyRes =  prisma.company.findUnique({where:{id:params.companyId}})
  const categoriesRes =  prisma.category.findMany()

  const [categories,company] = await Promise.all([categoriesRes,companyRes])

  return (
    <div>
 <Heading title="Company" description="Create and update companies" />


 <div className='mt-12 max-w-5xl'>
<CompanyForm company={company! } categories={categories} />
 </div>

    </div>
  )
}

export default page