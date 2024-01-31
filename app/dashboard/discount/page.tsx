import CarDiscountFeed from "@/components/(car discount)/car-discount-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cars = await prisma.car.findMany({
    include: {
      company: {
        select: {
          name: true,
        },
      },
      carModel: {
        select: { name: true },
      },
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Discount" description="Manage discounts" />
        <ClientModalButton
          modalInputs={{ toDelete: false, modal: "carDiscount", cars }}
        >
          Create discount
        </ClientModalButton>
      </div>

      <div className="mt-12">
        <CarDiscountFeed />
      </div>
    </div>
  );
};

export default page;
