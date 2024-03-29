"use client";

import { Car, CarModel } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import NavigatorButton from "../navigator-button";
import { CheckCircle, CircleDollarSign, Cog, Edit , ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";


type FullCar = Car & {
  carModel: CarModel & {
    carBrand: { brand: string; logo: string };
  };
  company: { name: string };
};

export const columns: ColumnDef<FullCar>[] = [
  {
    accessorKey:'car.carModel.carBrand.brand',
    accessorFn:(data)=>`${data.carModel.carBrand.brand} ${data.carModel.name}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
       Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <p className="capitalize">{row.original.company.name}</p>
    ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <NavigatorButton  className="text-xs font-medium" href={`/dashboard/car/${row.getValue("id")}`}>
          Edit <Edit className="ml-3 h-3 w-3" />
        </NavigatorButton>
        <NavigatorButton className="text-xs font-medium" href={`/dashboard/car/${row.getValue("id")}/pricings`}>
          Pricings <CircleDollarSign className="ml-3 h-3 w-3" />
        </NavigatorButton>
        <NavigatorButton className="text-xs font-medium" href={`/dashboard/car/${row.getValue("id")}/availability`}>
          Availability <CheckCircle className="ml-3 h-3 w-3" />
        </NavigatorButton>
        <NavigatorButton className="text-xs font-medium" href={`/dashboard/car/${row.getValue("id")}/extra-options`}>
          Extra options <Cog className="ml-3 h-3 w-3" />
        </NavigatorButton>
      </div>
    ),
  },
];
