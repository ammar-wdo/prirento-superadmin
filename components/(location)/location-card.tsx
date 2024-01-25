import { Location } from "@prisma/client";
import { Edit2, PlusCircle, Trash } from "lucide-react";
import React from "react";
import ClientModalButton from "../client-modal-button";

import { deleteLocation } from "@/actions/location-actions";
import ToolTip from "../tool-tip";

type Props = {
  location: Location;
};

const LocationCard = ({ location }: Props) => {
  return (
    <div className="flex flex-col min-w-[250px]  gap-2 border p-3 rounded-md">
      <div className="text-sm font-medium capitalize pb-3 mb-6 border-b flex items-center justify-between">
      <p >{location.name}</p>
      <ToolTip side="top" title="Add Sub-location">
<PlusCircle />
      </ToolTip>
      </div>
     
      <div className="flex gap-1 w-full">
        <ClientModalButton className="w-full" delete={deleteLocation} id={location.id}  destructive  data={{}} modal="delete">
          <Trash className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
        <ClientModalButton className="w-full"  data={{ location: location }} modal="location">
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
    
    </div>
  );
};

export default LocationCard;
