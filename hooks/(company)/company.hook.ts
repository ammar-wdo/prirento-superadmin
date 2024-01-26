import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companySchema, locationSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category, Company } from "@prisma/client";
import { useLogo } from "../logo.hook";
import { useGallary } from "../gallary.hook";

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
      newPassword: "",
      phoneNumber: company?.phoneNumber || "",
      whatsApp: company?.whatsApp || "",
      logo: company?.logo || "",
      gallary: company?.gallary || [],
      content: company?.content || "",
      categoryId: company?.categoryId || "",
      openingTime: company?.openingTime || [],
      promoted: company?.promoted,
    },
  });

  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
    } catch (error) {
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

  return { form, onSubmit,file,setFile,uploadImage,ImagePlaceholder ,imagesFile,setImagesFile,ImagesPlaceholder,uploadImages};
};
