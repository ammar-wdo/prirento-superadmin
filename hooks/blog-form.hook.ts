import { Blog } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { blogSchema } from "@/schemas"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { transformSlug } from "@/lib/utils"
import { useLogo } from "./logo.hook"
import { addBlog, editBlog } from "@/actions/blog-actions"


type Props= {
    blog:Blog | null
}

export const useBlog = ({blog}:Props)=>{
    
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
          title: blog?.title || "",
          author:blog?.author || "",
          categoryId:blog?.categoryId || "",
          content:blog?.content || "",
          logo:blog?.featuredImage || "",
            shortDescription:blog?.shortDescription || "",
            slug:blog?.slug || "",
            tags:blog?.tags || []
        },
      })

      useEffect(()=>{
        const handleKeyDown = (event:KeyboardEvent) => {
            if (event.key === 'Enter') {
             event.preventDefault()
             addTag()
            }
          };
      
         
          window.addEventListener('keydown', handleKeyDown);
      
          
          return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
      },[])

      const inputRef = useRef<HTMLInputElement>(null)

      const addTag = ()=>{
        console.log(form.watch('tags'))
        if(!inputRef.current?.value) return 

        const tags = form.getValues('tags')
        const newTags = [inputRef.current.value,...tags]
        form.setValue('tags',newTags)
        inputRef.current.value=''
      }


      const removeTag = (value:string)=>{

        const tags = form.getValues('tags')
        const newTags = tags.filter((tag)=>tag!==value)
        form.setValue('tags',newTags)

      }

      useEffect(()=>{
        const refinedSlug = transformSlug(form.watch('slug'))
        form.setValue('slug',refinedSlug)
      },[form.watch('slug')])

      const {ImagePlaceholder,file,setFile,uploadImage} = useLogo({form})

const router = useRouter()
      async function onSubmit(values: z.infer<typeof blogSchema>) {
        try {
            let res;
            if (blog) {
              res = await editBlog(
                values,
                blog.id,
              
              );
            } else {
              res = await addBlog(values);
            }
            if (res.error) {
              toast.error(res.error);
            } else {
             
              router.push('/dashboard/blog')
              router.refresh();
              toast.success(res.success);
            
            }
          } catch (error) {
            console.log(error);
            toast.error("something went wrong");
          }
      }

return {onSubmit,form,ImagePlaceholder,file,setFile,uploadImage,inputRef,addTag,removeTag}
}