import FallbackLoader from "@/components/fallback-loader.tsx";
import Heading from "@/components/heading";
import SignoutButton from "@/components/signout-button";
import ToggleCarsFeed from "@/components/toggle-car.feed";
import ToggleExtraOptionsFeed from "@/components/toggle-extraOptions-feed";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Dashboard" description="Manage Prirento" />

      <div className="bg-white border p-4 rounded-md mt-12">
        <Suspense fallback={ <FallbackLoader title="Pendig cars table ..."/>}>
        <ToggleCarsFeed />
        </Suspense>
       
      </div>
      <div className="bg-white border p-4 rounded-md mt-12">
        <Suspense fallback={<FallbackLoader title="Pending extra options table ..."/>}>
        <ToggleExtraOptionsFeed />
        </Suspense>
       
      </div>
    </div>
  );
};

export default page;
