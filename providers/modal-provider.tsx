'use client'


import BlogCategoryModal from "@/components/modals/blogCategory"
import CarAvailabilityModal from "@/components/modals/carAvailabilityModal"
import CarBrandModal from "@/components/modals/carBrand-modal"
import CarDiscountModal from "@/components/modals/carDiscount-modal"
import CarExtraOptionsModal from "@/components/modals/carExtraOptions-modal"
import CarModelModal from "@/components/modals/carModel-modal"
import CategoryModal from "@/components/modals/category-modal"
import DeleteModal from "@/components/modals/delete-modal"
import FaqModal from "@/components/modals/faq-modal"
import LocationModal from "@/components/modals/location-modal"
import PushNotificationsModal from "@/components/modals/pushNotificationModal"
import ReviewModal from "@/components/modals/review-modal"
import SubLocationModal from "@/components/modals/sublocation-modal"
import SuperadminRulesModal from "@/components/modals/superadmin-rule"
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
    <SuperadminRulesModal/>
    <CarExtraOptionsModal/>
    <BlogCategoryModal/>
    <FaqModal/>
    <ReviewModal/>
    <PushNotificationsModal/>
    </>
  )
}

export default ModalProvider