import ReviewsFeed from "@/components/(reviews)/reviews-feed";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {};

const page =async (props: Props) => {

   
  return (
    <div>
      <Heading title="Reviews" description="Manage reviews" />

      <div className="mt-12 bg-white rounded-xl overflow-hidden p-0.5">
        <ReviewsFeed  />
      </div>
    </div>
  );
};

export default page;
