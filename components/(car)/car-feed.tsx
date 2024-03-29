import React from "react";
import Heading from "../heading";
import NavigatorButton from "../navigator-button";
import prisma from "@/lib/prisma";
import NoResult from "../no-result";
import Image from "next/image";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ChevronsRight } from "lucide-react";

type Props = {};

const CarFeed = async (props: Props) => {
  const cars = await prisma.car.findMany({
    include: {
      carModel: {
        include: { carBrand: { select: { brand: true, logo: true } } },
      },
      company:{select:{name:true}}
    },
    orderBy:{createdAt:'desc'}
  });

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2">
       
        <NavigatorButton href="/dashboard/car/new">
          Create new car
        </NavigatorButton>
        <NavigatorButton href="/dashboard/brand" variant={'link'} >
          Manage Brands & Models <ChevronsRight className="w-6 h-6  ml-2" />
        </NavigatorButton>
      </div>

      <div className="mt-6 bg-white">
      <DataTable columns={columns} data={cars} />
      </div>
    </div>
  );
};

export default CarFeed;
