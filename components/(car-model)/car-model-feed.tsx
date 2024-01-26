import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import ClientModalButton from "../client-modal-button";
import CarModelCard from "./car-model-card";

type Props = {};

const CarModelFeed = async (props: Props) => {
  const carModels = await prisma.carModel.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="mt-12">
        <div className="flex items-center justify-between">
        <Heading title="Models" description="Manage Models" />
        <ClientModalButton modal="carModel" data={{}}>Create model</ClientModalButton>
        </div>
     

      <div className="mt-6">
        {!carModels.length && <NoResult title="No models" />}
        {!!carModels.length && (
          <div className="flex flex-wrap gap-2">
            {carModels.map((carModel) => (
              <CarModelCard key={carModel.id} carModel={carModel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarModelFeed;
