import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";

export function Blog() {
    const { loading,blog } = useBlog(Number(useParams().id));
    console.log(loading);
    
    if (loading || !blog) {
        return <div>
            <AppBar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    
    return <div>
        <AppBar></AppBar>
        <div className="flex justify-center w-full pt-20 max-w-screen-2xl px-44">
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    <div className="font-extrabold text-4xl">{blog.title}</div>
                    <div className="font-semibold text-slate-400 text-md py-2">Posted  on August 25, 2023</div>
                    <div className="">{blog.content}</div>
                </div>
                <div className="col-span-4 pl-6">
                    <div className="font-semibold text-slate-400 text-md">Author</div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-4">
                            <Avatar name={blog.author.name||"Anonymous"} size="big"></Avatar>
                        </div>
                        <div>
                            <div className="font-extrabold text-3xl">{blog.author.name||"Anonymous"}</div>
                            <div className="font-semibold text-slate-400 text-md py-2">The authors catch phrase wich seeks to catch the user's attention. </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}