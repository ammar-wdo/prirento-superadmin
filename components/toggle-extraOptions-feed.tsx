import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoResult from "./no-result";
import prisma from "@/lib/prisma";
import NavigatorButton from "./navigator-button";
import { statusMap } from "@/app/mapping";
import ToggleButon from "./toggle-button";

type Props = {};

const ToggleExtraOptionsFeed = async (props: Props) => {
  const pendingExtraOptions = await prisma.carExtraOption.findMany({
    where: { status: "pending" },
    include: {
      car: {
        include: {
          carModel: {
            include: {
              carBrand: { select: { brand: true } },
            },
          },
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <h3 className="pb-3 font-medium capitalize">Pending extra options</h3>
      {!pendingExtraOptions.length ? (
        <NoResult title="No pending extra options" className="text-base" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Label</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Car model</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
             
              <TableHead className="">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingExtraOptions.map((extraOption) => (
              <TableRow key={extraOption.id} className="capitalize">
                <TableHead className="">{extraOption.label}</TableHead>
                <TableHead>{extraOption.description}</TableHead>
                <TableHead>AED {extraOption.price}</TableHead>
                <TableHead>
                  {extraOption.car.carModel.carBrand.brand}{" "}
                  {extraOption.car.carModel.name}
                </TableHead>
                <TableHead className="">
                  {extraOption.car.company.name}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <TableHead>
                    <span
                      className={`${statusMap[extraOption.status]} w-fit p-1`}
                    >
                      {extraOption.status}
                    </span>
                  </TableHead>
                </TableHead>
             
                <TableHead className="">
                  <NavigatorButton
                  className="p-0"
                    variant={"link"}
                    href={`/dashboard/car/${extraOption.car.id}/extra-options`}
                  >
                    Check Option
                  </NavigatorButton>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ToggleExtraOptionsFeed;
