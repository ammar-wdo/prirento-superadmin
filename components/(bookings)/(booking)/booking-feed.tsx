import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import React from "react";

import { DataTable } from "./booking-table";
import { columns } from "./culomns";

type Props = {
  bookingCode:string | undefined,
  page:string | undefined
};

const BookingFeed = async ({bookingCode,page}: Props) => {

  

  const bookings = await prisma.booking.findMany({
  where:{
    ...(bookingCode && {bookingCode})
  },
    include: {
      car: {
        select: {
          company:{
            select:{
              name:true,
              
            }
          },
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
