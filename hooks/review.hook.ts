import { reviewSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useModal } from "./modals.hook"
import { addReveiw, editReveiw } from "@/actions/review-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export const useReview = ()=>{


const {modalInputs,setOpen,setClose} = useModal()
const review = modalInputs?.modal ==='review' ? modalInputs.review  : null
const companies = modalInputs?.modal ==='review' ? modalInputs.companies  : []



    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            companyId:review?.companyId || "",
          carId:review?.carId || "",
          email:review?.email || "",
          firstName:review?.firstName || "",
          lastName:review?.lastName || "",
          rate:review?.rate || undefined,
          placeholderDate:review?.placeholderDate || undefined,
          reviewContent:review?.reviewContent || "",
          status:review?.status || 'PENDING',
          visibility:review?.visibility || 'ANOUNYMOS'

        },
      })


const router = useRouter()
     async function onSubmit(values: z.infer<typeof reviewSchema>) {

        try {
            
            let res 

            if(!review){
                res = await addReveiw(values)
            }else {
                res = await editReveiw(review.id,values)
            }
        
            if(!res.success){
                toast.error(res.error)
            }else{
                toast.success(res.message)
                router.refresh()
                setClose()
            }


        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
   
      }



      return {onSubmit, form, companies}
}