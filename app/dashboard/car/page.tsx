import CarFeed from "@/components/(car)/car-feed";
import CarBrandFeed from "@/components/(car-brand)/car-brand-feed";
import CarModelFeed from "@/components/(car-model)/car-model-feed";
import Heading from "@/components/heading";
import { delay } from "@/lib/utils";
import React from "react";

type Props = {};
export const revalidate = 0
const page = async(props: Props) => {

  return (
    <div>
      <Heading title="Cars" description="Manage car's Brands & Models" />
      <CarBrandFeed/>
      <div className="mt-32">
      <CarModelFeed/>
      </div>
      <div className="mt-32">
      <CarFeed/>
      </div>
     
    </div>
  );
};

export default page;
