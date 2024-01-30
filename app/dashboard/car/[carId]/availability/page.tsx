import CarAvailabilityFeed from "@/components/(car availability)/car-availability-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import React from "react";

type Props = {
  params:{carId:string}
};

const page = ({params}: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Availability" description="Manage avaliability" />
        <ClientModalButton modalInputs={{toDelete:false,modal:'carAvailability'}}>Add date</ClientModalButton>
      </div>
      <div className="">
        <CarAvailabilityFeed carId={params.carId}/>
      </div>
    </div>
  );
};

export default page;
