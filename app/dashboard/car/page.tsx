import CarFeed from "@/components/(car)/car-feed";
import CarBrandFeed from "@/components/(car-brand)/car-brand-feed";
import CarModelFeed from "@/components/(car-model)/car-model-feed";
import Heading from "@/components/heading";
import React from "react";

type Props = {};
export const revalidate = 0
const page = (props: Props) => {
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
