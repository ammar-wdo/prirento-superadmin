import TermsForm from "@/components/(terms)/terms-form";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const terms = await prisma.terms.findUnique({
    where: {
      id: "Terms",
    },
  });
  return (
    <div>
      <Heading
        title="Terms & Conditions"
        description="Manage Terms & Conditions"
      />
      <div className="mt-12">
        <TermsForm term={terms} />
      </div>
    </div>
  );
};

export default page;
