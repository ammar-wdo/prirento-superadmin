import prisma from "@/lib/prisma";
import React from "react";
import NoResult from "../no-result";
import Image from "next/image";

import CarExtraoptionCard from "./carExtraOptions-card";

type Props = {
  id: string;
};

const CarExtraOptionsFeed = async ({ id }: Props) => {
  const carExtraOptions = await prisma.carExtraOption.findMany({
    where: {
      carId: id,
    },
    orderBy:{
        createdAt:'desc'
    }
  });

  return (
    <div>
      {!carExtraOptions.length && <NoResult />}
      {!!carExtraOptions.length && (
        <div className="flex flex-wrap gap-3">
          {carExtraOptions.map((extraOption) => (
           <CarExtraoptionCard key={extraOption.id} extraOption={extraOption}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarExtraOptionsFeed;
