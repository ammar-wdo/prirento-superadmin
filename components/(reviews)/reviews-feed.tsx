import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import NoResult from "../no-result";

import { cn, formatDate } from "@/lib/utils";
import ReactStarsComponent from "../react-stars-component";
import { reviewMapper } from "@/mapper";
import ReviewToggleButton from "./review-toggle-button";
import ToolTip from "../tool-tip";
import ClientModalButton from "../client-modal-button";
import { Edit, Trash } from "lucide-react";
import { deleteReveiw } from "@/actions/review-actions";

type Props = {
 dashboard?:boolean
};

const ReviewsFeed = async ({dashboard}: Props) => {
  const reviews = await prisma.review.findMany({
    ...(dashboard && {where:{
        status:'PENDING'
    }}),
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      rate: true,
      email:true,
      firstName:true,
      lastName:true,
      visibility: true,
      reviewContent: true,
      status: true,
      createdAt: true,
      bookingId:true,
      companyId:true,
      carId:true,
      placeholderDate:true,
      updatedUt:true,

    
      car: {
        select: {
          carModel: {
            select: {
              name: true,
              carBrand: {
                select: { brand: true },
              },
            },
          },
        },
      },
      company: {
        select: { name: true },
      },
    },
  });

  if (!reviews.length) return <NoResult />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-mail</TableHead>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Review contnet</TableHead>
          <TableHead>Visibility</TableHead>
          <TableHead>car</TableHead>
          <TableHead>company</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Toggle</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableHead>{review.email}</TableHead>
            <TableHead>{review.firstName}</TableHead>
            <TableHead>{review.lastName}</TableHead>
            <TableHead>
              <ReactStarsComponent rate={review.rate} />
            </TableHead>
            <TableHead><ToolTip  side="top" title={review.reviewContent || ''}><div  className="truncate max-w-[200px]">{review.reviewContent}</div></ToolTip></TableHead>
            <TableHead>{review.visibility}</TableHead>
            <TableHead>
              {review.car.carModel.carBrand.brand} {review.car.carModel.name}
            </TableHead>
            <TableHead>{review.company.name}</TableHead>
            <TableHead>
              {formatDate(new Date(review.placeholderDate || review.createdAt), "en-GB", {
                timeZone: "Asia/Dubai",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </TableHead>
            <TableHead ><span className={cn(reviewMapper[review.status],'border py-1 px-2 text-sm rounded-xl ')}>{review.status}</span></TableHead>
            <TableHead><ReviewToggleButton id={review.id} state={review.status==='ACTIVE'} /></TableHead>
            <TableHead><div className="flex items-center gap-2">
              
              <ClientModalButton modalInputs={{toDelete:false,modal:'review',review}}>Edit<Edit size={20} className="ml-2" /> </ClientModalButton>
              <ClientModalButton destructive={true} modalInputs={{toDelete:true,deleteFunction:deleteReveiw,deleteId:review.id,modal:'delete'}}>Delete<Trash size={20} className="ml-2" /> </ClientModalButton>
            
            </div></TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReviewsFeed;
