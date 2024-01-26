import prisma from "@/lib/prisma";
import React from "react";
import NoResult from "../no-result";
import LocationCard from "./location-card";

type Props = {};

const LocationFeed = async (props: Props) => {
  const locations = await prisma.location.findMany({
    orderBy: { createdAt: "desc" },
    include:{subLocations:true}
  });

  if (!locations.length) return <NoResult />;
  return (
    <div className="flex  flex-wrap gap-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationFeed;
