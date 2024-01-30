import CarPricingsForm from "@/components/(car)/car-pricings-form";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = { params: { carId: string } };

export const revalidate = 0

const page = async ({ params }: Props) => {
  const car = await prisma.car.findUnique({
    where: { id: params.carId },
    include: {
      company: { select: { name: true } },
      carModel: {
        select: { carBrand: { select: { brand: true } }, name: true },
      },
    },
  });

  if (!car) notFound();

  return (
    <div>
      <Heading
        title={`${car.carModel.carBrand.brand} ${car.carModel.name} Pricings`}
        description={`Manage pricings table - ${car.company.name}`}
      />

      <div className="mt-16 max-w-5xl bg-white p-6 border rounded-md">
        <CarPricingsForm pricings={car.pricings} hourPrice={car.hourPrice} id={params.carId} />
      </div>
    </div>
  );
};

export default page;
