import CarFeed from "@/components/(car)/car-feed";
import CarBrandFeed from "@/components/(car-brand)/car-brand-feed";
import CarModelFeed from "@/components/(car-model)/car-model-feed";
import FallbackLoader from "@/components/fallback-loader.tsx";

import Heading from "@/components/heading";

import React, { Suspense } from "react";

type Props = {};
export const revalidate = 0
const page = async(props: Props) => {

  return (
    <div>
      <Heading title="Cars" description="Manage car's Brands & Models" />
      <Suspense fallback={<FallbackLoader title="Loading Brands List.."/>}>
      <CarBrandFeed/>
      </Suspense>
     
      <div className="mt-32">
        <Suspense fallback={<FallbackLoader title="Loading Models List.."/>}>
        <CarModelFeed/>
        </Suspense>
    
      </div>
      <div className="mt-32">
        <Suspense fallback={<FallbackLoader title="Loading Cars Table.."/>} >
        <CarFeed/>
        </Suspense>
     
      </div>
     
    </div>
  );
};

export default page;
