import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { carId: string };
};

const page = async ({ params }: Props) => {
  const car = await prisma.car.findUnique({
    where: {
      id: params.carId,
    },
    include: {
      pickupLocations: { select: { id: true, name: true } },
      dropoffLocations: { select: { id: true, name: true } },
      pickupSubLocations: { select: { id: true, name: true } },
      dropoffSubLocations: { select: { id: true, name: true } },
    },
  });

  if (!car && params.carId !== "new") return notFound();
  return (
    <div>
      <Heading title="Car" description="Create new car" />
    </div>
  );
};

export default page;
