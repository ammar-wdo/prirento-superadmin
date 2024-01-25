import prisma from '@/lib/prisma'
import React from 'react'
import NoResult from '../no-result'
import LocationCard from './category-card'

type Props = {}

const CategoryFeed = async(props: Props) => {

    const categories = await prisma.category.findMany({orderBy:{createdAt:'desc'}})

    if(!categories.length) return <NoResult  />
  return (
    <div className='flex items-center flex-wrap gap-3'>
        {categories.map(category=><LocationCard key={category.id} category={category}/>)}
    </div>
  )
}

export default CategoryFeed