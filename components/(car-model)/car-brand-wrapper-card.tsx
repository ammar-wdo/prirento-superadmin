import { CarBrand, CarModel } from "@prisma/client";
import React from "react";
import NoResult from "../no-result";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CarModelCard from "./car-model-card";
import ClientModalButton from "../client-modal-button";
import { PlusCircle } from "lucide-react";
import ToolTip from "../tool-tip";

type Props = {
  brand: CarBrand & { carModels: CarModel[] };
  carsBrands: CarBrand[];
};

const CarBrandWraperCard = ({ brand, carsBrands }: Props) => {
  return (
    <div className=" p-6 border rounded-md bg-white">
      <div className="flex items-center justify-between">
        <h3 className="capitalize text-xl font-medium">{brand.brand}</h3>
        <ToolTip side="top" title="Create model">
          <ClientModalButton
            modalInputs={{
              toDelete: false,
              modal: "carModel",
              carsBrands: carsBrands,
              brandId: brand.id,
            }}
          >
            <PlusCircle />
          </ClientModalButton>
        </ToolTip>
      </div>

      <div className="space-y-1 mt-2">
        {!brand.carModels.length && (
          <NoResult
            className="text-sm text-start font-medium"
            title={`No models added for ${brand.brand.toUpperCase()} `}
          />
        )}
        {!!brand.carModels.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Car model</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brand?.carModels.map((carModel) => (
                <CarModelCard
                  carsBrands={carsBrands}
                  key={carModel.id}
                  carModel={carModel}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CarBrandWraperCard;
