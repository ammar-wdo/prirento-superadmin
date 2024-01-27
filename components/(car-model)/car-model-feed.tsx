import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import ClientModalButton from "../client-modal-button";
import CarModelCard from "./car-model-card";

type Props = {};

const CarModelFeed = async (props: Props) => {
  const carModelsRes =  prisma.carModel.findMany({
    orderBy: { createdAt: "desc" },include:{carBrand:{select:{brand:true}}}
  });

  const carsBrandsRes =  prisma.carBrand.findMany({select:{id:true,brand:true}})

  const [carModels,carsBrands] = await Promise.all([carModelsRes,carsBrandsRes])
  return (
    <div className="mt-12">
        <div className="flex items-center justify-between">
        <Heading small title="Models" description="Manage Models" />
        <ClientModalButton modalInputs={{toDelete:false,modal:'carModel',carsBrands:carsBrands}}>Create model</ClientModalButton>
        </div>
     

      <div className="mt-6">
        {!carModels.length && <NoResult title="No models" />}
        {!!carModels.length && (
          <div className="flex flex-wrap gap-2">
            {carModels.map((carModel) => (
              <CarModelCard carsBrands={carsBrands} key={carModel.id} carModel={carModel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarModelFeed;
