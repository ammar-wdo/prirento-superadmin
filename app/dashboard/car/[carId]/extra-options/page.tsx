import Heading from "@/components/heading";
import NavigatorButton from "@/components/navigator-button";
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
      <div>
        <Heading title={`Extra options - ${car.carModel.carBrand.brand} ${car.carModel.name} `} description={`Manage extra options - ${car.company.name} -company`} />
        
      </div>
    </div>
  );
};

export default page;
