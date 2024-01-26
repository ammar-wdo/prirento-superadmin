import prisma from '@/lib/prisma'
import React from 'react'
import NoResult from '../no-result'
import CompanyCard from './company-card'

type Props = {}

const CompanyFeed = async(props: Props) => {
const companies = await prisma.company.findMany({orderBy:{createdAt:'desc'}})
  return (
    <div>

        {!companies.length && <NoResult />}
     
        {!!companies.length && <div className='flex gap-2 flex-wrap'>{companies.map((company)=><CompanyCard key={company.id} company={company}/>)}</div>}

    </div>
  )
}

export default CompanyFeed