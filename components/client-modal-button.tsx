"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DeleteFunction,
  ModalData,
  ModalType,
  useModal,
} from "@/hooks/modals-hook/modals.hook";

type Props = {
  children: React.ReactNode;
  modal: ModalType;
  data: ModalData;
  small?: boolean;
  id?:string
  destructive?: boolean;
  delete?: DeleteFunction
  className?:string
};

const ClientModalButton = ({
  children,
  modal,
  data = {},
  small,
  destructive,
  delete: deleteFunction,
  id,
  className
}: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
    className={className || ''}
      variant={destructive ? "destructive" : "default"}
      size={small ? "sm" : "default"}
      onClick={() => setOpen(modal, data, deleteFunction,id)}
    >
      {children}
    </Button>
  );
};

export default ClientModalButton;
