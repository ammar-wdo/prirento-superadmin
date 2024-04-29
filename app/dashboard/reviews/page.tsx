import ReviewsFeed from "@/components/(reviews)/reviews-feed";
import ClientModalButton from "@/components/client-modal-button";
import Heading from "@/components/heading";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {};

const page =async (props: Props) => {

  const companies = await prisma.company.findMany({
    select:{
      id:true,
      name:true,
      cars:{
        select:{
          id:true,
          carModel:{
            select:{
              carBrand:{
                select:{
                  brand:true
                }
              },
              name:true
            }
          }
        }
      }
    }
  })

   
  return (
    <div>
      <div className="flex items-center justify-between">
      <Heading title="Reviews" description="Manage reviews" />
      <ClientModalButton modalInputs={{toDelete:false,modal:'review',review:undefined,companies}}>
        Add Review
      </ClientModalButton>
      </div>
    

      <div className="mt-12 bg-white rounded-xl overflow-hidden p-0.5">
        <ReviewsFeed  />
      </div>
    </div>
  );
};

export default page;
