import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../heading";
import NoResult from "../no-result";
import CarBrandWraperCard from "./car-brand-wrapper-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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
          <Accordion type="multiple" >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
              {allBrandsWithModels.map((brand) => (
                <AccordionItem
                  className="border rounded-md  bg-white p-4 "
                  key={brand.id}
                  value={brand.id}
                >
                  <AccordionTrigger className=" capitalize">
                    <span>{brand.brand}</span>
                    <span className="w-12 h-12 relative "><Image alt="logo" fill src={brand.logo}/></span>
                  </AccordionTrigger>
                  <AccordionContent className=" bg-white  ">
                    <CarBrandWraperCard carsBrands={carsBrands} brand={brand} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default CarModelFeed;
