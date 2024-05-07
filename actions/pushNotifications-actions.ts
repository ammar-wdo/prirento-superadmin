'use server'

import { sendPushNotification } from "@/lib/utils"
import { pushNotificationsSchema } from "@/schemas"


export const createPushNotifications = async (data:any)=>{



    try {

        const validDate = pushNotificationsSchema.safeParse(data)

        if(!validDate.success) return {success:false,error:"Invalid Inputs"}

        const {description,title,expoPushNotificationId}  =validDate.data

        if(!expoPushNotificationId) return {success:false,error:"Expo Push Notification Id is required"}

await sendPushNotification(expoPushNotificationId,title,description)

return {success:true,message:"Successfully Sent"}


        
    } catch (error) {
        console.log(error)
        return {success:false,error:"Internal Server Error"}
    }

}