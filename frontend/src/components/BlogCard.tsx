import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id:number
}

export const BlogCard = ({ authorName, title, content, publishedDate ,id}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="flex justify-between border-b border-slate-400 pb-2 w-screen max-w-screen-md cursor-pointer">
        <div>
            <div className="flex pt-4">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName}></Avatar>
                </div>
                <div className="font-semibold pl-2  text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle></Circle>
                </div>
                <div className="flex justify-center flex-col text-sm font-thin text-slate-500 pl-2">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>
            <div className="text-slate-400 text-xs font-thin pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
        <div className="flex justify-center flex-col p-4">
            <img src="./public/p1.jpg" alt="image" className="h-32"/>
        </div>
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-600"></div>
}

export function Avatar({ name, size="small" }: { name: string, size?:"small"|"big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size=="small"?"w-6 h-6":"w-8 h-8"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size=="small"?"text-xs":"text-lg"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>

} 