import CompanyForm from '@/components/(company)/company-form'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params:{companyId:string}
}

const page = async({params}: Props) => {
  const companyRes =  prisma.company.findUnique({where:{id:params.companyId}})
  const categoriesRes =  prisma.category.findMany()

  const [categories,company] = await Promise.all([categoriesRes,companyRes])

  if(!company && params.companyId !=='new') return notFound()

  return (
    <div>
 <Heading title={!company ? 'Company' : `${company.name} - company`} description={company ? `Update ${company.name}` : 'Create new company'} />


 <div className='mt-12 max-w-5xl bg-white p-6 border rounded-md'>
<CompanyForm company={company! } categories={categories} />
 </div>

    </div>
  )
}

export default page