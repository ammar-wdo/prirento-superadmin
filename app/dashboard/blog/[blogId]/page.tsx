import BlogForm from '@/components/(blogs)/blog-form'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params:{blogId:string}
}

const page = async({params}: Props) => {

    const blogRes =  prisma.blog.findUnique({
        where:{
            id:params.blogId
        }
    })


    const blogCategoriesRes = prisma.blogCategory.findMany({
      select:{
        id:true,
        label:true
      }
    })

    const [blog,blogCategories] = await Promise.all([blogRes,blogCategoriesRes])

    if(!blog && params.blogId !=='new') notFound()
 
  return (
   <div>
     <Heading title={ blog ? `Blog - ${blog.title}` : 'Blogs'} description={blog ? `Update ${blog.title}` : 'Create new blog'}   />

     <div className='mt-12 p-6 max-w-5xl border rounded-md bg-white'>
      <BlogForm blogCategories={blogCategories}  blog={blog}/>

     </div>
    </div>
  )
}


export default page