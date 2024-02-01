import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoResult from "../no-result";
import ClientModalButton from "../client-modal-button";


import { Percent } from "lucide-react";
import { deleteSuperadminRule } from "@/actions/superadmin-rules-actions";

type Props = {};

const SuperadminRulesFeed = async (props: Props) => {
  const superadminRulesRes = prisma.superadminRule.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      car: {
        select: {
          company: { select: { name: true } },
          carModel: { select: { name: true } },
        },
      },
    },
  });

  const carsRes = prisma.car.findMany({
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

  const [superadminRules, cars] = await Promise.all([superadminRulesRes, carsRes]);
  const icon = (value: "fixed" | "percentage") => {
    if (value === "fixed")
      return <span className="text-sm font-mono uppercase mr-1  ">aed</span>;
    return <Percent className="w-4 h-4 mr-1 " />;
  };

  return (
    <div>
      {!superadminRules.length && <NoResult />}
      {!!superadminRules.length && (
        <div className="bg-white border rounded-md p-1">
          <Table>
            <TableHeader>
              <TableRow>
             
                <TableHead>Label</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="">Value</TableHead>
                <TableHead className="">Car</TableHead>
                <TableHead className="">Mandatory</TableHead>
                
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {superadminRules.map((rule) => (
                <TableRow key={rule.id} className="capitalize">
             
                  <TableHead className="">{rule.label}</TableHead>
                  <TableHead className="">{rule.description}</TableHead>
                  <TableHead>{rule.type}</TableHead>
                  <TableHead className="flex items-center">
                    {icon(rule.type)}
                    {rule.value}
                  </TableHead>
                  <TableHead className="">
                    {rule.car ? (
                      <div className="w-[300px] flex items-center justify-between">
                        <span>{rule.car.carModel.name}</span>
                        <span>{rule.car.company.name}-Company</span>
                      </div>
                    ) : (
                      "All cars"
                    )}
                  </TableHead>
                  <TableHead>{rule.mandatory ? 'true'  : 'false'}</TableHead>
                

                
                  <TableHead className="">
                    <div className="flex items-center gap-2">
                      <ClientModalButton
                        modalInputs={{
                          toDelete: false,
                          modal: "superadminRule",
                          superadminRule: rule,
                          cars,
                        }}
                      >
                        Edit
                      </ClientModalButton>
                      <ClientModalButton
                        destructive
                        modalInputs={{
                          toDelete: true,
                          deleteFunction: deleteSuperadminRule,
                          deleteId: rule.id,
                          modal: "delete",
                        }}
                      >
                        Delete
                      </ClientModalButton>
                    </div>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SuperadminRulesFeed;
