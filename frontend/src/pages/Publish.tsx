import axios from "axios";
import AppBar from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Publish(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const navigate=useNavigate();
    return (
        <div>
            <AppBar/>
            <div className="pt-10 flex justify-center">
                <div className="flex justify-center flex-col pr-2">
                    <div>
                        <button type="button" className="text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                        onClick={async ()=>{
                            const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                                title,
                                content:description
                            },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                            navigate(`/blog/${response.data.blog_id}`)
                        }}>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M9 0v9H0v2h9v9h2v-9h9V9h-9V0H9z"/>
                        </svg>
                        <span className="sr-only">Icon description</span>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-screen-lg">
                    <input type="text" id="first_name" onChange={(e)=>{setTitle(e.target.value)}} className="h-20 pl-4 border-l-2 font-semibold text-3xl block w-full p-2.5 outline-0" placeholder="Title" required />
                </div>
            </div>
            <div className="pt-2 flex justify-center pl-12">
                <div className="w-full max-w-screen-lg">
                    <TextEditor setDescription={setDescription}/>
                </div>
            </div>
        </div>
    )
}

function TextEditor({setDescription}:{setDescription:React.Dispatch<React.SetStateAction<string>>}){
    return <textarea onChange={(e)=>{setDescription(e.target.value)}} rows={8} className="h-30 block p-2.5 pl-4 w-full text-md outline-0" placeholder="Write your thoughts here..."></textarea>
    
}