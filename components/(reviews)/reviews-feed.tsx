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

type Props = {};

const ReviewsFeed = async (props: Props) => {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      rate: true,
      visibility: true,
      reviewContent: true,
      status: true,
      createdAt: true,

      booking: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableHead>{review.booking.email}</TableHead>
            <TableHead>{review.booking.firstName}</TableHead>
            <TableHead>{review.booking.lastName}</TableHead>
            <TableHead>
              <ReactStarsComponent rate={review.rate} />
            </TableHead>
            <TableHead>{review.reviewContent}</TableHead>
            <TableHead>{review.visibility}</TableHead>
            <TableHead>
              {review.car.carModel.carBrand.brand} {review.car.carModel.name}
            </TableHead>
            <TableHead>{review.company.name}</TableHead>
            <TableHead>
              {formatDate(new Date(review.createdAt), "en-GB", {
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReviewsFeed;
