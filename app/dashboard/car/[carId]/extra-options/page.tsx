import CarExtraOptionsFeed from "@/components/(car extra-options)/carExtraOptions-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = { params: { carId: string } };

const page = async ({ params: { carId } }: Props) => {
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      company: { select: { name: true } },
      carModel: { include: { carBrand: { select: { brand: true } } } },
    },
  });

  if (!car) notFound();
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title={`Extra options - ${car.carModel.carBrand.brand} ${car.carModel.name} `} description={`Manage extra options - ${car.company.name} -company`} />
        <ClientModalButton modalInputs={{toDelete:false,modal:'carExtraOptions'}}>Create extra option</ClientModalButton>
        
      </div>

      <div className="mt-6">
        <CarExtraOptionsFeed id={carId} />
      </div>
    </div>
  );
};

export default page;
