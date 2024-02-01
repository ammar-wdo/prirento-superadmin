import { CarModel } from "@prisma/client";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { deleteCarModel } from "@/actions/carModel-actions";
import { Edit2, Trash } from "lucide-react";
import {
 
  TableCell,
  
  TableRow,
} from "@/components/ui/table";

type Props = {
  carModel: CarModel;
  carsBrands: { id: string; brand: string }[];
};

const CarModelCard = ({ carModel, carsBrands }: Props) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{carModel.name}</TableCell>
      <TableCell className="">
        {" "}
        <div className="flex justify-end items-center gap-1">
          <ClientModalButton
            className=" p-1 w-7 h-7"
            modalInputs={{
              toDelete: true,
              deleteFunction: deleteCarModel,
              deleteId: carModel.id,
              modal: "delete",
            }}
            destructive
            small
          >
            <Trash className="w-4 h-4 cursor-pointer" />{" "}
          </ClientModalButton>
          <ClientModalButton
            className="p-1 w-7 h-7"
            small
            modalInputs={{
              toDelete: false,
              modal: "carModel",
              carModel,
              carsBrands: carsBrands,
            }}
          >
            <Edit2 className="w-4 h-4 cursor-pointer" />{" "}
          </ClientModalButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CarModelCard;
