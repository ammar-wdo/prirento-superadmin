import PushNotificationFeed from '@/components/(push notification)/push-notification-feed'
import FallbackLoader from '@/components/fallback-loader.tsx'
import Heading from '@/components/heading'
import prisma from '@/lib/prisma'
import React, { Suspense } from 'react'


type Props = {}

const page = async(props: Props) => {

   
  return (
    <div>
        <Heading title='Push Notifications' description='Send Push Notifications' />

        <div className='mt-24 bg-white p-4 rounded-xl border'>
            <Suspense fallback={ <FallbackLoader title="Push Notifications..."/>}>
            <PushNotificationFeed />
            </Suspense>

        </div>
    </div>
  )
}

export default page