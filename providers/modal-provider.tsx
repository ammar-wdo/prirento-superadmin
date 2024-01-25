'use client'

import CategoryModal from "@/components/modals/category-modal"
import DeleteModal from "@/components/modals/delete-modal"
import LocationModal from "@/components/modals/location-modal"
import { useEffect, useState } from "react"

type Props = {}

const ModalProvider = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{setIsMounted(true)},[])
    if(!isMounted) return null
  return (
    <>
    <LocationModal />
    <DeleteModal/>
    <CategoryModal />
    </>
  )
}

export default ModalProvider