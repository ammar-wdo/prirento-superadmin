import { Company } from "@prisma/client";
import Image from "next/image";
import React from "react";
import NavigatorButton from "../navigator-button";
import ClientModalButton from "../client-modal-button";
import { deleteCompany } from "@/actions/company-actions";

type Props = {
  company: Company;
};

const CompanyCard = ({ company }: Props) => {
  return (
    <div className="p-3 border rounded-md max-w-[400px] w-full bg-white">
      <div className="w-full aspect-video relative">
        <Image
          src={company.logo}
          alt="logo"
          fill
          className="rounded-md object-cover"
        />
      </div>

      <h2 className="mt-3 font-medium text-lg capitalize">{company.name}</h2>
      <p className="text-muted-foreground text-sm ">{company.email}</p>
      <NavigatorButton
        href={`/dashboard/company/${company.id}`}
        title="Edit"
        className="w-full mt-8"
      />
      <ClientModalButton
        modalInputs={{
          modal: "delete",
          toDelete: true,
          deleteFunction: deleteCompany,
          deleteId: company.id,
        }}
        destructive
        className="w-full mt-1"
      >
        Delete
      </ClientModalButton>
    </div>
  );
};

export default CompanyCard;
