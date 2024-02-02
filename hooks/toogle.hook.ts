import { Inputs, superAdminToggles } from "@/actions/superadmin-toggles-actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


type Props= {
    type:Inputs,
    id:string
}

export const useToggle = ({id,type}:Props)=>{

const [isLoading, setisLoading] = useState(false)
const router = useRouter()
    const toggle = async ()=>{
        try {

            setisLoading(true)

            const res =  await superAdminToggles(id,type)

            if(res.error){
                toast.error(res.error)
            }
            else{
                toast.success(res.success)
                router.refresh()
            }
            
        } catch (error) {
            console.log(error)
            toast.error('Someting went wrong')
        } finally{
            setisLoading(false)
        }
    }

    return{ toggle,isLoading}

}