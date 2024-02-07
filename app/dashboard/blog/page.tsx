import BlogsCategoryFeed from "@/components/(blogs category)/blogs-category-feed";
import BlogsFeed from "@/components/(blogs)/blogs-feed";
import FallbackLoader from "@/components/fallback-loader.tsx";
import Heading from "@/components/heading";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Blogs" description="Manage blogs" />
      <div className="mt-12">
        <Suspense fallback={<FallbackLoader />}>
          <BlogsCategoryFeed />
        </Suspense>
      </div>
      <div className="mt-28">
        <Suspense fallback={<FallbackLoader />}>
          <BlogsFeed />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
