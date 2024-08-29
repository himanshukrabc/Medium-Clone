import { Avatar } from "./BlogCard";

export default function AppBar(){
    return <div className="border-b flex justify-between px-10 py-5 sticky top-0">
        <div className="flex flex-col jusify-center font-semibold">Medium</div>
        <div>
            <Avatar name="Himanshu" size='big'></Avatar>
        </div>
    </div>
}