import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import React from "react";

import { DataTable } from "./booking-table";
import { columns } from "./culomns";

type Props = {};

const BookingFeed = async (props: Props) => {


  const bookings = await prisma.booking.findMany({
   
    include: {
      car: {
        select: {
          carModel: {
            select: {
              name: true,
              carBrand: {
                select: {
                  brand: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return <DataTable columns={columns} data={bookings} />;
};

export default BookingFeed;
