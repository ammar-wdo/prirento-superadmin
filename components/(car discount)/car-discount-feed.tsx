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
import { deleteCarDiscount } from "@/actions/car-discount-actions";

type Props = {};

const CarDiscountFeed = async (props: Props) => {
  const carDiscountsRes =  prisma.carDiscount.findMany({
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

  const carsRes =  prisma.car.findMany({
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
  })

  const [carDiscounts,cars] =await  Promise.all([carDiscountsRes,carsRes])

  return (
    <div>
      {!carDiscounts.length && <NoResult />}
      {!!carDiscounts.length && (
        <div className="bg-white border rounded-md p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Promocode</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="">Value</TableHead>
                <TableHead className="">Car</TableHead>
                <TableHead className="">Discount apply type</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carDiscounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableHead className="">{discount.promocode}</TableHead>
                  <TableHead>{discount.label}</TableHead>
                  <TableHead>{discount.type}</TableHead>
                  <TableHead className="">{discount.value}</TableHead>
                  <TableHead className="">
                    {discount.car ? (
                      <div className="w-[300px] flex items-center justify-between">
                        <span>{discount.car.carModel.name}</span>
                        <span>{discount.car.company.name}-Company</span>
                      </div>
                    ) : (
                      "All cars"
                    )}
                  </TableHead>
                  <TableHead className="">
                    {discount.discountApplyType}
                  </TableHead>
                  <TableHead className="">
                    <div className="flex items-center gap-2">
                        <ClientModalButton modalInputs={{toDelete:false,modal:'carDiscount',carDiscount:discount,cars}}>
                            Edit
                        </ClientModalButton>
                        <ClientModalButton destructive modalInputs={{toDelete:true,deleteFunction:deleteCarDiscount,deleteId:discount.id,modal:'delete'}}>
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

export default CarDiscountFeed;
