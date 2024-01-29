import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export  async function areIdsValid(ids:string[], model:'location' | 'subLocation') {
  let count = 0;

  if (model === 'location') {
    count = await prisma.location.count({
      where: {
        id: { in: ids }
      }
    });
  } else if (model === 'subLocation') {
    count = await prisma.subLocation.count({
      where: {
        id: { in: ids }
      }
    });
  }
if(count !== ids.length){
  throw new Error(`${model} IDs are not valid`)
}
}


export async function isIdValid(id:string,model:'company'){
  if(model==='company'){
    const company = await prisma.company.findUnique({where:{id}})
    if(!company){
      throw new Error('Company ID is invalid')
    }
  }
}


export   const transformSlug = (slug:string) => {
  return slug?.toLowerCase().replace(/\s+/g, '-');
};
