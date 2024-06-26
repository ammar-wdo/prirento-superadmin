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

    return thePassword
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
  model: "company" | "car" | "blogCategory" | "blog" | "location" | "sub-location",
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
  if (model === "blogCategory") {
    const category = await prisma.blogCategory.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (category) {
      throw new Error("Slug already exists");
    }
  }
  if (model === "blog") {
    const blog = await prisma.blog.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (blog) {
      throw new Error("Slug already exists");
    }
  }
  if (model === "location") {
    const location = await prisma.location.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (location) {
      throw new Error("Slug already exists");
    }
  }
  if (model === "sub-location") {
    const subLocation = await prisma.subLocation.findUnique({
      where: { slug, ...(id && { NOT: { id } }) },
    });
    if (subLocation) {
      throw new Error("Slug already exists");
    }
  }
};

export const checkLabel = async (
  label: string,
  model: "blogCategory",
  id?: string
) => {
  if (model === "blogCategory") {
    const category = await prisma.blogCategory.findUnique({
      where: {
        label,
        ...(id && { NOT: { id } }),
      },
    });

    if (category) {
      throw new Error("Label already exists");
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


export function generateHourlyTimes() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    // Pad the hour with a leading zero if it's less than 10
    const formattedHour = hour.toString().padStart(2, '0');
    times.push(`${formattedHour}:00`);
  }
  return times;
}

export function combineDateAndTimeToUTC(dateString:string, timeString:string) {
  // Combine the date and time strings
  const combinedDateTimeString = `${dateString}T${timeString}:00.000Z`;

  // Create a Date object from the combined string
  const utcDate = new Date(combinedDateTimeString);

  return utcDate;
}


export function convertDateToISOString(date:Date | undefined) {
  if (!date) {
    return undefined;
  }



  // Manually construct the ISO string in YYYY-MM-DD format
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  // Pad single digit month and day with leading zeros
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay}`;

}

export function delay(ms:number=3000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




export function formatDate(
  date: Date,
  locale: string = 'en-GB',
  options: Intl.DateTimeFormatOptions & { timeZone: string } = {
    timeZone: 'UTC', 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
  }
): string {
  // Merge default options with any user-provided options
  const mergedOptions: Intl.DateTimeFormatOptions = { ...options };

  return new Intl.DateTimeFormat(locale, mergedOptions).format(date);
}

export function getTime(date: Date | undefined) {
  if (!date) {
    return '';
  }

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function generatePromoCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let promoCode = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      promoCode += characters[randomIndex];
  }

  return promoCode;
}


export const generateTimeSlots = (stepMinutes = 15) => {
  const slots = [];
  const totalMinutes = 24 * 60;
  for (let minute = 0; minute < totalMinutes; minute += stepMinutes) {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }
  return slots;
}




export async function sendPushNotification(expoPushToken:string,title:string,body?:string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  };
try {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
} catch (error) {
  console.log("Error send push notifications",error)
}

}
