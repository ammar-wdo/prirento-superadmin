'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


  import React from 'react'
  
  type Props = {title:string,children:React.ReactNode,side:"top" | "right" | "bottom" | "left" }
  
  const ToolTip = ({title,children,side}: Props) => {
    return (
        <TooltipProvider>
        <Tooltip delayDuration={40} >
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent side={side || 'left'} >
           <p >{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  export default ToolTip