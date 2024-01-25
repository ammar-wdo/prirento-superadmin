import LocationFeed from "@/components/(location)/location-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Location" description="Manage locations & sub-locations" />
        <ClientModalButton data={{}} modal="location" >Add location</ClientModalButton>
      </div>
      <div className="mt-12">
        <LocationFeed />
      </div>
    </div>
  );
};

export default page;
