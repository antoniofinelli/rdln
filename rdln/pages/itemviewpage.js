import Navbar from "./components/navbar"
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import Itemimage from "./components/itemimage"

export default function Itemviewpage(props){
    const [title, setTitle]=useState(null)
    const [description, setDescription]=useState(null)
    const [username, setUsername]=useState(null)
    const [images, setImages]=useState(null)

    const router = useRouter()

    useEffect(()=>{
        let params = new URLSearchParams(document.location.search);
        if(params.get("id")){
            getItem(params.get("id"))
        }else{
            navToInvalid()
        }
    },[1])

    const getItem = async (id) =>{
        let { data } = await supabase
        .from('item')
        .select('*')
        .eq('id', id)
        .single()
        if(data){
            setTitle(data.title)
            setDescription(data.description)
            getUsername(data.itemuser)
            generateImages(data.files)
        } else {
            navToInvalid()
        }
    }

    const getUsername = async (id) =>{
        let { data, error } = await supabase
        .from('profiles_public')
        .select('username')
        .eq('id', id)
        .single()
        if(data){setUsername(data.username)} 
    }

    function generateImages(files){
        if(files){
            const items = files.map((data)=>
                <div className="h-96 w-96">
                    <Itemimage key = {data} path = {data}  size = {"w-full h-full px-2"}/>
                </div>
            )

            setImages(items)
        }
    }

    function navToInvalid(){
        router.push('Invalid item id.')
    }

    return(
        <div>
            <Navbar />
            <h1>{title}</h1>
            <h2>{description}</h2>
            <h3>{username}</h3>
            <ul>
                {images}
            </ul>
        </div>
    )
}