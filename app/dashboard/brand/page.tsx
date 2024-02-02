import CarBrandFeed from '@/components/(car-brand)/car-brand-feed'
import CarModelFeed from '@/components/(car-model)/car-model-feed'
import FallbackLoader from '@/components/fallback-loader.tsx'
import Heading from '@/components/heading'
import React, { Suspense } from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading title='Brands & Models' description='Manage Cars Brands & Models'/>

        <div >
        <Suspense fallback={<FallbackLoader title="Loading Brands List.." />}>
          <CarBrandFeed />
        </Suspense>
      </div>

      <div className="mt-32">
        <Suspense fallback={<FallbackLoader title="Loading Models List.." />}>
          <CarModelFeed />
        </Suspense>
      </div>

    </div>
  )
}

export default page