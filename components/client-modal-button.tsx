"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DeleteFunction,
  ModalInputs,
  useModal,
} from "@/hooks/modals.hook";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  modalInputs: ModalInputs;
  small?: boolean;
  destructive?: boolean;
  type?:'submit'|'button';
  disabled?:boolean
  

} & React.HtmlHTMLAttributes<HTMLButtonElement>

const ClientModalButton = ({
  children,
type,
  small,
  destructive,
  modalInputs,
  className,
  disabled,
  ...rest
}: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
    disabled={disabled}
  type={type}
      className={cn(className || "")}
      variant={destructive ? "destructive" : "default"}
      size={small ? "sm" : "default"}
      onClick={() => setOpen(modalInputs)}
    >
      {children}
    </Button>
  );
};

export default ClientModalButton;
