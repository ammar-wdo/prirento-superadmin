import CarForm from "@/components/(car)/car-form";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { carId: string };
};

const page = async ({ params }: Props) => {
  const carRes = prisma.car.findUnique({
    where: {
      id: params.carId,
    },
    include: {
      pickupLocations: { select: { id: true } },
      dropoffLocations: { select: { id: true } },
      pickupSubLocations: { select: { id: true } },
      dropoffSubLocations: { select: { id: true } },
      carModel:{include:{carBrand:{select:{brand:true}}}}
    },
  });

  const locationsRes = prisma.location.findMany({
    include: { subLocations: { select: { id: true, name: true } } },
  });

  const modelsRes = prisma.carModel.findMany({include:{carBrand:{select:{logo:true,brand:true}}}})
  const companiesRes = prisma.company.findMany({select:{id:true,name:true}})

  const [car,locations,models,companies] = await Promise.all([carRes,locationsRes,modelsRes,companiesRes])

  if (!car && params.carId !== "new") return notFound();
  return (
    <div>
      <Heading title={car ? car.carModel.name +' ' +  car.carModel.carBrand.brand : 'Car' } description={car ? `Update ${car.carModel.name +" " + car.carModel.carBrand.brand}` : 'Create new car'} />
      <div className="mt-16 max-w-5xl">
      <CarForm car={car} locations={locations} companies={companies} models={models}/>
      </div>
     
    </div>
  );
};

export default page;
