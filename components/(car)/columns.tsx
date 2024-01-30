"use client";

import { Car, CarModel } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import NavigatorButton from "../navigator-button";
import { CircleDollarSign, Edit } from "lucide-react";

type FullCar = Car & {
  carModel: CarModel & {
    carBrand: { brand: string; logo: string };
  };
  company: { name: string };
};

export const columns: ColumnDef<FullCar>[] = [
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium flex items-center justify-between capitalize w-full max-w-[200px]">
          <span>
            {row.original.carModel.carBrand.brand}- {row.original.carModel.name}
          </span>

          <span className="w-10 h-10 relative">
            <Image
              src={row.original.carModel.carBrand.logo}
              alt="logo"
              fill
              className="object-contain"
            />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "company.name",
    header: "Company",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.company.name}</p>
    ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <NavigatorButton href={`/dashboard/car/${row.getValue("id")}`}>
          Edit <Edit className="ml-3 h-4 w-4" />
        </NavigatorButton>
        <NavigatorButton href={`/dashboard/car/${row.getValue("id")}/pricings`}>
          Pricings <CircleDollarSign className="ml-3 h-4 w-4" />
        </NavigatorButton>
      </div>
    ),
  },
];
