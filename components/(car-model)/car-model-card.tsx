import { CarModel } from "@prisma/client";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { deleteCarModel } from "@/actions/carModel-actions";
import { Edit2, Trash } from "lucide-react";

type Props = {
  carModel: CarModel & { carBrand: { brand: string } };
  carsBrands: { id: string; brand: string }[];
};

const CarModelCard = ({ carModel, carsBrands }: Props) => {
  return (
    <div className="flex flex-col gap-2 border p-3 rounded-md min-w-[150px] bg-white">
      <h3 className="text-sm font-medium capitalize">{carModel.name}</h3>
      <p className="text-xs capitalize text-muted-foreground mt-1">
        {carModel.carBrand.brand}
      </p>
      <div className="flex items-center gap-1">
        <ClientModalButton
          className="w-full"
          modalInputs={{
            toDelete: true,
            deleteFunction: deleteCarModel,
            deleteId: carModel.id,
            modal: "delete",
          }}
          destructive
          small
        >
          <Trash className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
        <ClientModalButton
          className="w-full"
          small
          modalInputs={{
            toDelete: false,
            modal: "carModel",
            carModel,
            carsBrands: carsBrands,
          }}
        >
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
    </div>
  );
};

export default CarModelCard;
