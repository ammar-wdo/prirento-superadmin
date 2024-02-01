import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import CarBrandWraperCard from "./car-brand-wrapper-card";

type Props = {};

const CarModelFeed = async (props: Props) => {
  const allBrandsWithModels = await prisma.carBrand.findMany({
    include: {
      carModels: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const carsBrands = allBrandsWithModels.map(({ carModels, ...rest }) => rest);

  return (
    <div className="mt-12">
      <Heading small title="Models" description="Manage Models" />

      <div className="mt-12">
        {!allBrandsWithModels.length && <NoResult title="No Brands" />}
        {!!allBrandsWithModels.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {allBrandsWithModels.map((brand) => (
              <CarBrandWraperCard
                carsBrands={carsBrands}
                brand={brand}
                key={brand.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarModelFeed;
