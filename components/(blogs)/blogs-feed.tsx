import React from "react";
import Heading from "../heading";
import NavigatorButton from "../navigator-button";
import prisma from "@/lib/prisma";
import NoResult from "../no-result";
import BlogCard from "./blog-card";

type Props = {};

const BlogsFeed = async (props: Props) => {
  const blogs = await prisma.blog.findMany({
    orderBy:{
      createdAt:'desc'
    },include:{
      category:{
        select:{
          label:true
        }
      }
    }
  })
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Blogs" description="Manage blogs" small />
        <NavigatorButton href="/dashboard/blog/new">Create blog</NavigatorButton>
      </div>
      <div className="mt-8">
{!blogs.length && <NoResult title="No blogs"/>}
{!!blogs.length && <div className="flex gap-2 flex-wrap">{blogs.map(blog=><BlogCard blog={blog} key={blog.id}/>)}</div>}
      </div>
    </div>
  );
};

export default BlogsFeed;
