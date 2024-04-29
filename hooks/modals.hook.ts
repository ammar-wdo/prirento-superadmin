import { BlogCategory, Car, CarAvailability, CarBrand, CarDiscount, CarExtraOption, CarModel, Category, Faq, Location, Review, SubLocation, SuperadminRule } from "@prisma/client";
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
      carsBrands:{id:string,brand:string}[],
      brandId?:string
    }
  | {
      toDelete: false;
      modal: "carBrand";
      carBrand?: CarBrand;
    }
  | {
      toDelete: false;
      modal: "carAvailability";
      carAvailability?: CarAvailability;
    }
  | {
      toDelete: false;
      modal: "carDiscount";
      carDiscount?: CarDiscount;
      cars:(Car & {company:{name:string},carModel:{name:string}})[]
    }
  | {
      toDelete: false;
      modal: "superadminRule";
      superadminRule?: SuperadminRule;
      cars:(Car & {company:{name:string},carModel:{name:string}})[]
    }
  | {
      toDelete: false;
      modal: "carExtraOptions";
      carExtraOption?: CarExtraOption;
   
    }
  | {
      toDelete: false;
      modal: "blogCategory";
      blogCategory?: BlogCategory;
   
    }
  | {
      toDelete: false;
      modal: "faq";
      faq?: Faq;
   
    } |{
      toDelete: false;
      modal:'review',
      review?:Review,
      companies?:{
        name: string;
        id: string;
        cars: {
            carModel: {
                name: string;
                carBrand: {
                    brand: string;
                };
            };
            id: string;
        }[];
    }[]
    }

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

