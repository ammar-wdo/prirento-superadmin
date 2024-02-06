import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companySchema, locationSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category, Company } from "@prisma/client";
import { useLogo } from "./logo.hook";
import { useGallary } from "./gallary.hook";
import { addCompany, editCompany } from "@/actions/company-actions";
import { useEffect, useState } from "react";
import { transformSlug } from "@/lib/utils";

type Props = {
  company?: Company;
};

type DayOpeningTimes = {
  openTime: string;
  closeTime: string;
  closed: boolean;
}

// Define the overall structure for the default opening times
type OpeningTimes ={
  [key: string]: DayOpeningTimes;
}
export type Day = "Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Saturday"
// Define the structure for the dropdown status state
export type DropdownStatus= {
  [day: string]: {
    openTimeDropdown: boolean;
    closeTimeDropdown: boolean;
    closed:boolean
  };
}



export const useCompany = ({ company }: Props) => {

  const defaultOpeningTimes ={
    "Monday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Tuesday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Wednesday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Thursday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Friday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Saturday": { "openTime": "09:00", "closeTime": "17:00", "closed": false },
    "Sunday": { "openTime": "09:00", "closeTime": "17:00", "closed": false }
  }
  const router = useRouter();

  const [dropdownStatus, setDropdownStatus] = useState<DropdownStatus>(
    Object.keys(defaultOpeningTimes).reduce((acc, day) => ({
      ...acc,
      [day]: { openTimeDropdown: false, closeTimeDropdown: false ,closed:false}
    }), {} as DropdownStatus) // Type assertion for the initial state
  );

  const toggleDropdown = (day: string, dropdownType: 'openTimeDropdown' | 'closeTimeDropdown') => {
    setDropdownStatus(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [dropdownType]: !prevState[day][dropdownType]
      }
    }));
  };

 
  type OpeneingsTime = typeof defaultOpeningTimes
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name || "",
      email: company?.email || "",
      password: company?.password || "",
      slug:company?.slug || "",
      newPassword: "",
      address:company?.address || "",
      phoneNumber: company?.phoneNumber || "",
      whatsApp: company?.whatsApp || "",
      logo: company?.logo || "",
      gallary: company?.gallary || [],
      content: company?.content || "",
      categoryId: company?.categoryId || "",
      openingTime: company?.openingTime as unknown as OpeneingsTime  || defaultOpeningTimes,
      promoted: company?.promoted,
      terms:company?.terms || ""
    },
  });

  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
      
        let res 
        if(company){
res = await editCompany(values,company.id)
        }else{
            res = await addCompany(values)
         
        }

        if(res.error){
            toast.error(res.error)
        }else{
            toast.success(res.success)
router.push('/dashboard/company')
router.refresh()
        }
    } catch (error) {
        console.log(error)
      toast.error("Something went wrong");
    }
  }

  const { ImagePlaceholder, file, setFile, uploadImage } = useLogo({ form });
  const {
    ImagesPlaceholder,
    deleteImagesLoader,
    deleteanImage,
    imagesFile,
    imagesLoader,
    setImagesFile,
    uploadImages,
  } = useGallary({ form });




  useEffect(()=>{
    const refinedSlug = transformSlug(form.watch('slug'))
    form.setValue('slug',refinedSlug)
  },[form.watch('slug')])

  const setter = (day:Day,type:'openTime' | 'closeTime',value:string)=>{

    form.setValue(`openingTime.${day}.${type}`,value)
 
   }
 
   const toggleClose = (day:Day)=>{
     const closedValue = form.watch(`openingTime.${day}.closed`)
 
     form.setValue(`openingTime.${day}.closed`,!closedValue)
   }

  return { form, onSubmit,file,setFile,uploadImage,ImagePlaceholder ,imagesFile,setImagesFile,ImagesPlaceholder,uploadImages,dropdownStatus,
    toggleDropdown,
    setter,
    toggleClose};
};
