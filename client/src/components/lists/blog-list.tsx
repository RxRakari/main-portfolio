import { useNavigate } from "react-router-dom";
import BlogCard from "../ui/blog-card";
import { useBlogs } from "../../hooks/queries/use-portfolio-data";
import { useEffect, useState } from "react";
import { BlogProps } from "../../types/blog";
import EmptyState from "../states/empty";
import { BlogSkeleton } from "../states/skeleton-loading";
import ErrorState from "../states/error";

const BlogList = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<BlogProps[]>();
    const { data: blogsData, isLoading, error } = useBlogs();

    useEffect(() => {
        if (blogsData?.data?.blogs) {
            setBlogs(blogsData.data.blogs);
        }
    }, [blogsData])      

    if(isLoading){
        return(
            <BlogSkeleton />
        )
    }

    if(!blogs || blogs?.length === 0){
        return(
        <EmptyState title={"No blogs found"} message={"No blogs available at the moment"}  />
        )
    }

    if(error){
        <ErrorState title={"Error loading blogs data"} message={"Please try again"} />
    }

  return (
    <div className="flex flex-col w-full p-4 md:p-[30px] gap-8 md:gap-12">
        <div>
        <h1 className="font-medium text-2xl md:text-4xl pb-4 md:pb-[35px]">Featured</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
        {blogs?.map((blog: any, index) => (
            <BlogCard key={index} title={blog.title} paragraph={blog.intro} author={blog.author} time={blog.readTime} avatar={blog.coverImage} onClick={() => navigate(`/blogs/${blog._id || blog.slug}`)} />
        ))}
        </div>
        </div>

        <div>
        <h1 className="font-medium text-2xl md:text-4xl pb-4 md:pb-[35px]">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
        {blogs?.map((blog: any, index) => (
            <BlogCard key={index} title={blog.title} paragraph={blog.intro} author={blog.author} time={blog.readTime} avatar={blog.coverImage} onClick={() => navigate(`/blogs/${blog._id || blog.slug}`)} />
        ))}
        </div>
        </div>
    </div>
  )
}

export default BlogList;