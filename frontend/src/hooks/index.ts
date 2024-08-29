import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog{
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}

export const useBlogs=()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((response)=>{
            setBlogs(response.data);
            setLoading(false);
        });
    },[]);
    return {loading,blogs};
}


export const useBlog=(id:number)=>{
    const [blog,setBlog] = useState<Blog>();
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`,{
            headers:{Authorization:"Bearer "+localStorage.getItem("token")}
        }).then((response)=>{
            setBlog(response.data);
            setLoading(false);
        });
    },[]);
    return {loading,blog};
}