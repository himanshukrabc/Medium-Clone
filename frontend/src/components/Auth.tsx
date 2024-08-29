import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@himanshukrabc/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}:{type: "signup"|"signin"})=>{
    const [postInput,setPostInput] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`,postInput);
            const jwt=response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs"); 
        }
        catch(e){
            alert("Error");
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div >
                <div className="px-20 text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-lg font-medium text-center text-slate-600">
                    {type=="signup"?
                    <span>Already have an account? <Link to={"/signin"}><u>Sign in</u></Link></span>
                    :<span>Don't have an account? <Link to={"/signup"}><u>Sign up</u></Link></span>}
                </div>
                {type=="signup"?<LabelledInput label="Name" placeholder="Name" onChange={(e)=>{setPostInput({...postInput,name:e.target.value})}}/>:null}
                <LabelledInput label="Username" placeholder="Username" onChange={(e)=>{setPostInput({...postInput,email:e.target.value})}}/>
                <LabelledInput label="Password" placeholder="Password" onChange={(e)=>{setPostInput({...postInput,password:e.target.value})}}/>
                <button onClick={sendRequest} className="mt-10 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"?"Sign up":"Sign in"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange : (e:React.ChangeEvent<HTMLInputElement>)=>void
}

function LabelledInput({label, placeholder, onChange}:LabelledInputType){
    return <div>
            <label className="pt-2 block mb-2 text-md font-semibold text-gray-900 ">{label}</label>
            <input onChange={onChange} type={label=="Password"?"password":"text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required/>
        </div>
}