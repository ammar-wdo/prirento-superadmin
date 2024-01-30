import { Location, SubLocation } from "@prisma/client";
import { Edit2, PlusCircle, Trash } from "lucide-react";
import React from "react";
import ClientModalButton from "../client-modal-button";

import { deleteLocation } from "@/actions/location-actions";
import ToolTip from "../tool-tip";
import { deleteSubLocation } from "@/actions/sublocations-actions";

type Props = {
  location: Location & { subLocations: SubLocation[] };
};

const LocationCard = ({ location }: Props) => {
  return (
    <div className="flex flex-col min-w-[250px] max-w-[400px]  gap-2 border p-3 rounded-md bg-white">
      <div className="text-sm font-medium capitalize pb-3 mb-6 border-b flex items-center justify-between">
        <p>{location.name}</p>
        <ToolTip side="top" title="Add Sub-location">
          <ClientModalButton
            modalInputs={{
              modal: "sub-location",
              toDelete: false,
              parentId:location.id
            
            }}
            className=""
          >
            <PlusCircle />
          </ClientModalButton>
        </ToolTip>
      </div>
      {!location.subLocations.length && (
        <p className="text-muted-foreground text-sm">No sub-locations</p>
      )}
      {!!location.subLocations.length && (
        <div className="flex flex-col gap-1 w-full">
          {location.subLocations.map((el) => (
            <div
              key={el.id}
              className="flex items-center gap-3 justify-between w-full relative group cursor-pointer p-2"
            >
              <p className="capitalize text-xs font-medium text-muted-foreground flex items-start gap-1">
                <span>-</span>
                {el.name}
              </p>
              <div className="flex gap-1  ">
                <ClientModalButton
                  className="w-6 h-6 rounded-sm p-0"
                  destructive
                  modalInputs={{
                    toDelete: true,
                    deleteFunction: deleteSubLocation,
                    deleteId: el.id,
                    modal: "delete",
                  }}
                >
                  <Trash className="w-3 h-3 cursor-pointer" />{" "}
                </ClientModalButton>
                <ClientModalButton
                  className="w-6 h-6 p-0 rounded-sm"
                  modalInputs={{
                    toDelete: false,
                    modal: "sub-location",
                    subLocation: el,
                    parentId: location.id,
                  }}
                >
                  <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
                </ClientModalButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1 w-full mt-auto">
        <ClientModalButton
          className="w-full"
          modalInputs={{
            toDelete: true,
            deleteId: location.id,
            deleteFunction: deleteLocation,
            modal: "delete",
          }}
          destructive
        >
          <Trash className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
        <ClientModalButton
          className="w-full"
          modalInputs={{
            toDelete: false,
            modal: "location",
            location: location,
          }}
        >
          <Edit2 className="w-3 h-3 cursor-pointer" />{" "}
        </ClientModalButton>
      </div>
    </div>
  );
};

export default LocationCard;
