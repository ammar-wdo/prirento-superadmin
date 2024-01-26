import CarModelFeed from "@/components/(car-model)/car-model-feed";
import Heading from "@/components/heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Cars" description="Manage car's Brands & Models" />
      <CarModelFeed/>
    </div>
  );
};

export default page;
