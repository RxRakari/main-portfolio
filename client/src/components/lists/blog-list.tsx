import { useNavigate } from "react-router-dom";
import { doodle } from "../../assets";
import BlogCard from "../ui/blog-card";

const BlogList = () => {
    const navigate = useNavigate();

    const blogs = [
        {
            id: 0,
            title: "Blog",
            info: "You've hit your free requests limit.",
            author: "Trump Donald",
            avatar: doodle,
            time: "2 mins",
            featured: true
        },
        {
            id: 1,
            title: "Blog",
            info: "You've hit your free requests limit.",
            author: "Trump Donald",
            avatar: doodle,
            time: "2 mins",
            featured: true
        },
        {
            id: 2,
            title: "Blog",
            info: "You've hit your free requests limit.",
            author: "Trump Donald",
            avatar: doodle,
            time: "2 mins",
            featured: true
        }
    ]
  return (
    <div className="flex flex-col w-full p-4 md:p-[30px] gap-8 md:gap-12">
        <div>
        <h1 className="font-medium text-2xl md:text-4xl pb-4 md:pb-[35px]">Featured</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
        {blogs.map((blog, index) => (
            <BlogCard key={index} title={blog.title} paragraph={blog.info} author={blog.author} time={blog.time} avatar={blog.avatar} onClick={() => navigate(`/blogs/${blog.id}`)} />
        ))}
        </div>
        </div>

        <div>
        <h1 className="font-medium text-2xl md:text-4xl pb-4 md:pb-[35px]">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
        {blogs.map((blog, index) => (
            <BlogCard key={index} title={blog.title} paragraph={blog.info} author={blog.author} time={blog.time} avatar={blog.avatar} onClick={() => navigate(`/blogs/${blog.id}`)} />
        ))}
        </div>
        </div>
    </div>
  )
}

export default BlogList;