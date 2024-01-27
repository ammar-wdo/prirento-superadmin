"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DeleteFunction,
 
  ModalInputs,
 
  useModal,
} from "@/hooks/modals-hook/modals.hook";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
modalInputs:ModalInputs
  small?: boolean;

  destructive?: boolean;


  className?:string
} 

const ClientModalButton = ({
  children,
 
  small,
  destructive,
 modalInputs,
  className
}: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
    className={cn(className || '')}
      variant={destructive ? "destructive" : "default"}
      size={small ? "sm" : "default"}
      onClick={() => setOpen(modalInputs)}
    >
      {children}
    </Button>
  );
};

export default ClientModalButton;
