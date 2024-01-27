import CategoryFeed from "@/components/(category)/category-feed";
import LocationFeed from "@/components/(location)/location-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};
export const revalidate = 0
const page = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Category" description="Manage categories for items" />
        <ClientModalButton data={{}} modal="category" >Add category</ClientModalButton>
      </div>
      <div className="mt-12">
        <CategoryFeed />
      </div>
    </div>
  );
};

export default page;
