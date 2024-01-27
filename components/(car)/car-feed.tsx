import React from "react";
import Heading from "../heading";
import NavigatorButton from "../navigator-button";
import prisma from "@/lib/prisma";
import NoResult from "../no-result";
import Image from "next/image";

type Props = {};

const CarFeed = async (props: Props) => {
  const cars = await prisma.car.findMany({
    include: {
      carModel: {
        include: { carBrand: { select: { brand: true, logo: true } } },
      },
    },
  });

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Heading small title="Cars" description="Manage Cars" />
        <NavigatorButton href="/dashboard/car/new">
          Create new car
        </NavigatorButton>
      </div>

      <div className="mt-6">
        {!cars.length && <NoResult title="No cars" />}
        {!!cars.length && (
          <div className="flex flex-wrap gap-2">
            {cars.map((car) => (
              <div key={car.id} className="p-3 rounded-md border min-w-[350px]">
                <div className="aspect-video relative w-full">
                  <Image
                    src={car.carModel.carBrand.logo}
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-medium text-lg py-3">{car.carModel.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarFeed;
