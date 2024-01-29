import { CarBrand, CarModel, Category, Location, SubLocation } from "@prisma/client";
import { create } from "zustand";

export type DeleteFunction = (
  id: string
) => Promise<
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }
>;
export type ModalInputs =
  | {
      toDelete: true;
      url?:string
      modal: "delete";
      deleteId: string;
      deleteFunction: DeleteFunction;
    }
  | { toDelete: false;
     modal: "location";
     parentId?: string;
      location?: Location }
  | {
      toDelete: false;
      modal: "sub-location";
      subLocation?: SubLocation;
      parentId?: string;
    }
  | {
      toDelete: false;
      modal: "category";
      category?: Category;
    }
  | {
      toDelete: false;
      modal: "carModel";
      carModel?: CarModel;
      carsBrands:{id:string,brand:string}[]
    }
  | {
      toDelete: false;
      modal: "carBrand";
      carBrand?: CarBrand;
    };

type Store = {
  open: boolean;

  modalInputs: ModalInputs | null;

  setOpen: (modalInputs: ModalInputs) => void;
  setClose: () => void;
};

export const useModal = create<Store>()((set) => ({
  open: false,

  modalInputs: null,
  setOpen: (modalInputs: ModalInputs) => set({ open: true, modalInputs }),
  setClose: () =>
    set({
      open: false,
      modalInputs: null,
    }),
}));

// import { CarModel, Category, Location, SubLocation } from "@prisma/client";
// import { create } from "zustand";

// export type ModalType = "location" | "category" | "delete" | "sub-location" | "carModel";

// export type ModalData = {
//   location?: Location;
//   category?:Category,
//   subLocation?:SubLocation,
//   carModel?:CarModel
// };

// export type DeleteFunction = (
//   id: string
// ) => Promise<
//   | { message: string; success?: undefined }
//   | { success: string; message?: undefined }
// >;

// type Store = {
//   open: boolean;
//   type: ModalType | "";
//   data?: ModalData;
//   deleteFunction?: DeleteFunction | undefined;
//   deleteId?: string;
//   parentId?:string,
//   setOpen: (
//     type: ModalType,
//     data: ModalData,
//     func?: DeleteFunction,
//     id?: string,
//     parentId?:string
//   ) => void;
//   setClose: () => void;
// };

// export const useModal = create<Store>()((set) => ({
//   open: false,
//   data: {},
//   type: "",
//   setOpen: (type: ModalType, data = {}, func?: DeleteFunction, deleteId?: string,parentId?:string) =>
//     set({ open: true, type, data, deleteFunction: func, deleteId ,parentId}),
//   setClose: () =>
//     set({ open: false, type: "", data: {}, deleteFunction: undefined, deleteId: "",parentId:"" }),
// }));
