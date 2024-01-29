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
import { useEffect } from "react";
import { transformSlug } from "@/lib/utils";

type Props = {
  company?: Company;
};

export const useCompany = ({ company }: Props) => {
  const router = useRouter();

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
      openingTime: company?.openingTime || [],
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

  return { form, onSubmit,file,setFile,uploadImage,ImagePlaceholder ,imagesFile,setImagesFile,ImagesPlaceholder,uploadImages};
};
