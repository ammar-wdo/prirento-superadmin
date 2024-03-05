"use client"

import { cn, formatDate } from "@/lib/utils"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Booking } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"



export const paymentStatusMap:{[key:string]:string} ={
  PENDING:'bg-yellow-500/20 text-yellow-500 border border-yellow-500 rounded-md',
  SUCCEEDED:'bg-green-500/20 text-green-500 border border-green-500 rounded-md',
  EXPIRED:'bg-rose-500/20 text-rose-500 border border-rose-500 rounded-md',
  }
  


export const columns: ColumnDef<Booking & {car :{company:{name:string},carModel:{name:string,carBrand:{brand:string}}}}>[] = [
  {
    accessorKey: "bookingCode",
 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booking Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=> <Link className="text-blue-500 underline pl-6" href={`/dashboard/booking/${row.original.id}`}>{row.original.bookingCode}</Link>
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "car.company.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorFn:(data)=>`${data.car.carModel.carBrand.brand} ${data.car.carModel.name}`,
  accessorKey:'car.carModel.carBrand.brand',
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Car
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  },
    cell:({row})=> <p>{row.original.car.carModel.carBrand.brand}{" "} {row.original.car.carModel.name}</p>
    

  },

  {
    accessorKey:'payNow',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=> <span>{row.original.payNow} AED</span>
    
    
  },
  {
    accessorKey:'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booking Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=> <span>{formatDate(row.original.createdAt,'en-GB',{ timeZone: 'Asia/Dubai', 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, })}</span>
    
    
  },
  {
    accessorKey:'startDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=> <span>{formatDate(row.original.startDate)}</span>
    
    
  },
  {
    accessorKey:'endDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=> <span>{formatDate(row.original.endDate)}</span>
    
    
  },
  {
    accessorKey:'paymentStatus',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>  <span className={`px-4 py-2 ${paymentStatusMap[row.original.paymentStatus]} `}>{row.original.paymentStatus}</span>
    
    
  },
]
