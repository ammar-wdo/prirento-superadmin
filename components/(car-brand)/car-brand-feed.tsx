import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import ClientModalButton from "../client-modal-button";
import Image from "next/image";
import { deleteCarBrand } from "@/actions/carBrand-actions";
import { Edit2, Trash } from "lucide-react";
import CarBrandCard from "./car-brand-card";


type Props = {};

const CarBrandFeed = async (props: Props) => {
  const carBrands = await prisma.carBrand.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="mt-12">
        <div className="flex items-center justify-between">
        <Heading small title="Brands" description="Manage brands" />
        <ClientModalButton modalInputs={{toDelete:false,modal:'carBrand'}}>Create new brand</ClientModalButton>
        </div>
     

      <div className="mt-6">
        {!carBrands.length && <NoResult title="No brands" />}
        {!!carBrands.length && (
          <div className="flex flex-wrap gap-2">
            {carBrands.map((carBrand) => (
       <CarBrandCard key={carBrand.id} carBrand={carBrand}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandFeed;
