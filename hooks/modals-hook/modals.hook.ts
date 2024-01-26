import { CarModel, Category, Location, SubLocation } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "location" | "category" | "delete" | "sub-location" | "carModel";

export type ModalData = {
  location?: Location;
  category?:Category,
  subLocation?:SubLocation,
  carModel?:CarModel
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
  deleteId?: string;
  parentId?:string,
  setOpen: (
    type: ModalType,
    data: ModalData,
    func?: DeleteFunction,
    id?: string,
    parentId?:string
  ) => void;
  setClose: () => void;
};

export const useModal = create<Store>()((set) => ({
  open: false,
  data: {},
  type: "",
  setOpen: (type: ModalType, data = {}, func?: DeleteFunction, deleteId?: string,parentId?:string) =>
    set({ open: true, type, data, deleteFunction: func, deleteId ,parentId}),
  setClose: () =>
    set({ open: false, type: "", data: {}, deleteFunction: undefined, deleteId: "",parentId:"" }),
}));
