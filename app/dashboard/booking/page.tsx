import BookingFeed from "@/components/(bookings)/(booking)/booking-feed";
import Heading from "@/components/heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Booking" description="Manage bookings" />

      <div className="mt-12 bg-white">
        <BookingFeed />
      </div>
    </div>
  );
};

export default page;
