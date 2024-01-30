import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}





export const newPasswordCheck = async(newPassword:string | undefined,password:string)=>{


  let thePassword;
    if (newPassword) {
      thePassword =  await hashPassword(newPassword);
    } else {
      thePassword = password;
    }

    return newPassword
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export async function areIdsValid(
  ids: string[],
  model: "location" | "subLocation"
) {
  let count = 0;

  if (model === "location") {
    count = await prisma.location.count({
      where: {
        id: { in: ids },
      },
    });
  } else if (model === "subLocation") {
    count = await prisma.subLocation.count({
      where: {
        id: { in: ids },
      },
    });
  }
  if (count !== ids.length) {
    throw new Error(`${model} IDs are not valid`);
  }
}

export async function isIdValid(id: string, model: "company") {
  if (model === "company") {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new Error("Company ID is invalid");
    }
  }
}

export const transformSlug = (slug: string) => {
  return slug?.toLowerCase().replace(/\s+/g, "-");
};

export const checkSlug = async (
  slug: string,
  model: "company" | "car",
  id?: string
) => {
  if (model === "car") {
    const car = await prisma.car.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (car) {
      throw new Error("Slug already exists");
    }
  }
  if (model === "company") {
    const company = await prisma.company.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (company) {
      throw new Error("Slug already exists");
    }
  }
};

export const checkEmail = async (
  email: string,
  model: "company",
  id?: string
) => {
  if (model === "company") {
    const company = await prisma.company.findUnique({
      where: {
        email: email,
        ...(id && { NOT: { id } }),
      },
    });

    if (company) {
      throw new Error("Email already exists");
    }
  }
};
