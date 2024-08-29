import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "./Skeleton";

export function Blogs() {
    const {loading,blogs} = useBlogs();
    if(loading){
        return <div>
            <AppBar /> 
            <div  className="flex justify-center">
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </div>
    }
    
    return <div>
        <AppBar></AppBar>
        <div className="flex justify-center">
            <div className="w-4xl">
                {blogs.map((b)=>{
                    return <BlogCard authorName={b.author.name||"Anonymous"} title={b.title} content={b.content} publishedDate="24 Dec, 2023" id={Number(b.id)}></BlogCard>
                })}
            </div>
        </div>
    </div>
    
}