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
import { deleteFaq } from "@/actions/faq-actions";

type Props = {};

const FaqFeed = async (props: Props) => {
  const faqs = await prisma.faq.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!faqs.length) return <NoResult />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
       
          <TableHead>Question</TableHead>
          <TableHead>Answer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faqs.map((faq) => (
          <TableRow key={faq.id}>
            <TableCell>{faq.question}</TableCell>
            <TableCell className="line-clamp-3">{faq.answer}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <ClientModalButton
                  modalInputs={{ modal: "faq", faq, toDelete: false }}
                >
                  Edit
                </ClientModalButton>
                <ClientModalButton
            destructive
                  modalInputs={{
                    toDelete: true,
                    deleteFunction: deleteFaq,
                    deleteId: faq.id,
                    modal: "delete",
                  }}
                >
                  Delete
                </ClientModalButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FaqFeed;
