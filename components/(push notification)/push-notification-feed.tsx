import prisma from "@/lib/prisma";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import ClientModalButton from "../client-modal-button";
import { SendHorizonal } from "lucide-react";

type Props = {};

const PushNotificationFeed = async (props: Props) => {
  const companies = await prisma.company.findMany({
    select: {
      pushNotificationToken: true,
      id: true,
      slug: true,
      name: true,
      email: true,
      logo: true,
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company name</TableHead>
          <TableHead>Company Email</TableHead>
          <TableHead>Company Logo</TableHead>
          <TableHead className="text-center">
            Company Expo Push Notification ID
          </TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="capitalize">{company.name}</TableCell>
            <TableCell>{company.email}</TableCell>
            <TableCell>
              <div className="w-24 h-24 rounded relative overflow-hidden">
                <Image
                  fill
                  alt="logo"
                  src={company.logo}
                  className="object-contain"
                />
              </div>
            </TableCell>
            <TableCell className="text-center">
              {company.pushNotificationToken || "N/A"}
            </TableCell>{" "}
            <TableCell className="text-center">
              <ClientModalButton
              disabled={!company.pushNotificationToken}
                modalInputs={{
                  toDelete: false,
                  modal: "push-notification",
                  companyId: company.id,
                  companyName: company.name,
                  expoPushNotificationId:company.pushNotificationToken || undefined
                }}
                
              >
               <SendHorizonal className="mr-3" /> Send Notification 
              </ClientModalButton>
            </TableCell>{" "}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PushNotificationFeed;
