'use client'

import CarAvailabilityForm from "@/components/(car availability)/car-availability-form"
import SubLocationForm from "@/components/(sub-location)/sublocation-form"
import CarAvailabilityModal from "@/components/modals/carAvailabilityModal"
import CarBrandModal from "@/components/modals/carBrand-modal"
import CarDiscountModal from "@/components/modals/carDiscount-modal"
import CarModelModal from "@/components/modals/carModel-modal"
import CategoryModal from "@/components/modals/category-modal"
import DeleteModal from "@/components/modals/delete-modal"
import LocationModal from "@/components/modals/location-modal"
import SubLocationModal from "@/components/modals/sublocation-modal"
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
    <SubLocationModal/>
    <CarModelModal/>
    <CarBrandModal/>
    <CarAvailabilityModal/>
    <CarDiscountModal/>
    </>
  )
}

export default ModalProvider