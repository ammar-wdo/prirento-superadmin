import { Category, Location } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "location" | "category" | "delete";

export type ModalData = {
  location?: Location;
  category?:Category
};

export type DeleteFunction = (
  id: string
) => Promise<
  | { message: string; success?: undefined }
  | { success: string; message?: undefined }
>;

type Store = {
  open: boolean;
  type: ModalType | "";
  data?: ModalData;
  deleteFunction?: DeleteFunction | undefined;
  id?: string;
  setOpen: (
    type: ModalType,
    data: ModalData,
    func?: DeleteFunction,
    id?: string
  ) => void;
  setClose: () => void;
};

export const useModal = create<Store>()((set) => ({
  open: false,
  data: {},
  type: "",
  setOpen: (type: ModalType, data = {}, func?: DeleteFunction, id?: string) =>
    set({ open: true, type, data, deleteFunction: func, id }),
  setClose: () =>
    set({ open: false, type: "", data: {}, deleteFunction: undefined, id: "" }),
}));
