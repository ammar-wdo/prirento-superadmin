import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import ClientModalButton from "../client-modal-button";

import { PlusCircle } from "lucide-react";
import CarBrandCard from "./car-brand-card";
import ToolTip from "../tool-tip";

type Props = {};

const CarBrandFeed = async (props: Props) => {
  const carBrands = await prisma.carBrand.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Heading small title="Brands" description="Manage brands" />
      </div>

      <div className="mt-6">
        {!carBrands.length && <NoResult title="No brands" />}
        {!!carBrands.length && (
          <div className="flex flex-wrap gap-2 mt-12">
            <ToolTip side="top" title="Create brand">
              <ClientModalButton
                className="bg-white min-w-[200px] p-0 h-full flex items-center justify-center hover:bg-white border"
                modalInputs={{ toDelete: false, modal: "carBrand" }}
              >
                <PlusCircle className="text-muted-foreground " />
              </ClientModalButton>
            </ToolTip>
            {carBrands.map((carBrand) => (
              <CarBrandCard key={carBrand.id} carBrand={carBrand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandFeed;
