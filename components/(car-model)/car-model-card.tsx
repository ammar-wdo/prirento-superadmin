import { CarModel } from "@prisma/client";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { deleteCarModel } from "@/actions/carModel-actions";
import { Edit2, Trash } from "lucide-react";

type Props = {
  carModel: CarModel;
};

const CarModelCard = ({ carModel }: Props) => {
  return (
    <div className="flex items-center gap-2 border p-3 rounded-md">
      <div className="flex items-center gap-1">
        <ClientModalButton
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
        <ClientModalButton small modalInputs={{toDelete:false,modal:'carModel',carModel}}>
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
      <p className="text-sm font-medium capitalize">{carModel.name}</p>
    </div>
  );
};

export default CarModelCard;
