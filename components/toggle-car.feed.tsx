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
import NoResult from "./no-result";
import NavigatorButton from "./navigator-button";
import { statusMap } from "@/app/mapping";
import ToggleButon from "./toggle-button";

type Props = {};

const ToggleCarsFeed = async (props: Props) => {
  const pendingCars = await prisma.car.findMany({
    where: {
      carStatus: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      carModel: {
        include: { carBrand: { select: { brand: true } } },
      },
      company: { select: { name: true } },
    },
  });

  return (
    <div>
      <h3 className="pb-3 font-medium capitalize">Pending cars</h3>
      {!pendingCars.length ? (
        <NoResult className="text-base" title="No pending cars"/>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Model</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Toggle</TableHead>
              <TableHead className="">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingCars.map((car) => (
              <TableRow key={car.id} className="capitalize">
                <TableHead className="">
                  {car.carModel.carBrand.brand} {car.carModel.name}
                </TableHead>
                <TableHead>{car.company.name}</TableHead>
                <TableHead>{car.year}</TableHead>
                <TableHead ><span className={`${statusMap[car.carStatus]} w-fit p-1`}>{car.carStatus}</span></TableHead>
                <TableHead className=""><ToggleButon id={car.id} type="car"/></TableHead>
                <TableHead className="">
                  <NavigatorButton
                    variant={"link"}
                    href={`/dashboard/car/${car.id}`}
                  >
                    Check
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

export default ToggleCarsFeed;
