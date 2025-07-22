const BlogCard = ({ title, paragraph, avatar, author, time, onClick }: any) => {
  return (
    <div className="flex flex-col w-full p-[30px] border border-gray-600/50 rounded-[25px] justify-between h-[350px] hover:border-white cursor-pointer" onClick={onClick} >
      <div>
      <h1 className="text-5xl font-medium pb-[20px]">{title}</h1>
      <p className="text-[1.5rem] text-gray-400">{paragraph}</p>
      </div>

      <div className="flex items-center gap-6">
        <img src={avatar} alt="" className="rounded-[25px] w-[70px] h-[70px]" />
        <div className="flex flex-col gap-2">
            <p className="text-[1.4rem] text-gray-300">By {author}</p>
            <span className="text-gray-400">{time} read</span>
        </div>
      </div>
    </div>
  )
}

export default BlogCard;