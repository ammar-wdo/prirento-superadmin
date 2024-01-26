"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DeleteFunction,
  ModalData,
  ModalType,
  useModal,
} from "@/hooks/modals-hook/modals.hook";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  modal: ModalType;
  data: ModalData;
  small?: boolean;
  deleteId?:string
  destructive?: boolean;
  delete?: DeleteFunction
  parentId?:string,
  className?:string
} 

const ClientModalButton = ({
  children,
  modal,
  data = {},
  small,
  destructive,
  delete: deleteFunction,
  deleteId,
  parentId,
  className
}: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
    className={cn(className || '')}
      variant={destructive ? "destructive" : "default"}
      size={small ? "sm" : "default"}
      onClick={() => setOpen(modal, data, deleteFunction,deleteId,parentId)}
    >
      {children}
    </Button>
  );
};

export default ClientModalButton;
