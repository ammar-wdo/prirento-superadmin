import React from 'react'
import Heading from '../heading'
import prisma from '@/lib/prisma'
import NoResult from '../no-result'
import ClientModalButton from '../client-modal-button'
import BlogCategoryCard from './blogs-category-card'

type Props = {}

const BlogsCategoryFeed = async(props: Props) => {

    const categories = await prisma.blogCategory.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })

  return (
    <div>
        <div className='flex items-center justify-between'>
        <Heading title='Category' description='Manage categories' small/>
        <ClientModalButton modalInputs={{toDelete:false,modal:'blogCategory'}}>
            Create category
        </ClientModalButton>
        </div>

        <div className='mt-8'>
            {!categories.length && <NoResult title='No categories '/>}
            {!!categories.length && <div className='flex items-center flex-wrap gap-4'>{categories.map((cat)=><BlogCategoryCard key={cat.id} category={cat}/>)}</div>  }

        </div>
      
    </div>
  )
}

export default BlogsCategoryFeed