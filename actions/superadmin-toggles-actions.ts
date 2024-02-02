'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

export type Inputs = 'car' | 'extra-option'

export const superAdminToggles = async(id:string,type:Inputs)=>{

    console.log('toggle')

    const session = await getServerSession(authOptions)
    if(!session) return {error:'Unauthorized'}

    if(!id || typeof id !=='string') return {error:'Invalid Id'}
    if((type !== 'extra-option') && (type !=='car')) return {error:'Invalid type'}

    if(type === 'car'){
try {
    await prisma.car.update({
        where:{
            id
        },
        data:{
            carStatus:'active'
        }
    })

    return {success:'Successfully activated'}

} catch (error) {
    
    console.log(error)
    return {error:'Something went wrong'}
}
      

    }

    else if(type === 'extra-option'){

        try {

            await prisma.carExtraOption.update({
                where:{
                    id
                },
                data:{
                    status:'active'
                }
            })
            return {success:'Successfully activated'}
            
        } catch (error) {
            console.log(error)
            return {error:'Something went wrong'}
        }


    }


    return {error:'someting went wrong'}

}