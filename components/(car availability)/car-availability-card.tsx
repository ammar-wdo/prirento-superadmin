import { CarAvailability } from "@prisma/client";
import React from "react";
import ClientModalButton from "../client-modal-button";
import { deleteCarAvailability } from "@/actions/car-availability-actions";
import { formatDate } from "@/lib/utils";

type Props = {
  carAvailability: CarAvailability;
};

const CarAvailabilityCard = ({ carAvailability }: Props) => {
  return (
    <div className="p-3 border rounded-md bg-white w-full max-w-[300px] flex flex-col gap-3">
      {carAvailability.label && <h3>{carAvailability.label}</h3>}
      <div>
      <div className="flex items-center justify-between">
        <p>Start date</p>
        <p className="text-xs">
          {formatDate(carAvailability.startDate)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p>End date</p>
        <p className="text-xs">
          {formatDate(carAvailability.endDate)}
        </p>
      </div>
      </div>
   
      <div className="mt-auto w-full flex items-center gap-3">
      <ClientModalButton
      className="w-full"
        modalInputs={{
          toDelete: false,
          carAvailability: carAvailability,
          modal: "carAvailability",
        }}
      >
        Edit
      </ClientModalButton>
      <ClientModalButton
      className="w-full"
        destructive
        modalInputs={{
          toDelete: true,
          modal: "delete",
          deleteId: carAvailability.id,
          deleteFunction: deleteCarAvailability,
        }}
      >
        Delete
      </ClientModalButton>
      </div>
    
    </div>
  );
};

export default CarAvailabilityCard;
