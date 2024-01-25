import { Location } from "@prisma/client";
import { Edit2, Trash } from "lucide-react";
import React from "react";
import ClientModalButton from "../client-modal-button";

import { deleteLocation } from "@/actions/location-actions";

type Props = {
  location: Location;
};

const LocationCard = ({ location }: Props) => {
  return (
    <div className="flex items-center gap-2 border p-3 rounded-md">
      <div className="flex items-center gap-1">
        <ClientModalButton delete={deleteLocation} id={location.id}  destructive small data={{}} modal="delete">
          <Trash className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
        <ClientModalButton small data={{ location: location }} modal="location">
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
      <p className="text-sm font-medium capitalize">{location.name}</p>
    </div>
  );
};

export default LocationCard;
