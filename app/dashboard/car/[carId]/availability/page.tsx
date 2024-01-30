import CarAvailabilityFeed from "@/components/(car availability)/car-availability-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params:{carId:string}
};

const page = async({params}: Props) => {
  const carExist = await prisma.car.findUnique({where:{
    id:params.carId
  }})

  if(!carExist) notFound()
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
