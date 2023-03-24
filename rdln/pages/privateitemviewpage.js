import Navbar from "./components/navbar"
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'

import Sellerpagetitleedit from "./sellerPage/sellerpagetitleedit"
import Sellerpagedescriptionedit from "./sellerPage/sellerpagedescriptionedit"
import Sellerpagedelete from "./sellerPage/sellerpagedelete"
import Sellerpageuploadmorefiles from "./sellerPage/sellerpageuploadmorefiles"
import Itemimageprivate from "./components/itemimageprivate"

export default function Itemviewpage(props){
    const [title, setTitle]=useState(null)
    const [description, setDescription]=useState(null)
    const [username, setUsername]=useState(null)
    const [images, setImages]=useState(null)
    const [sellerpage, setSellerPage] = useState(null)

    const router = useRouter()

    useEffect(()=>{
        let params = new URLSearchParams(document.location.search);
        if(params.get("id")){
            getItem(params.get("id"))
            setSellerPage(<Sellerpageuploadmorefiles id = {params.get("id")}/>)
        }else{
            navToInvalid('Invalid Item ID.')
        }
    },[1])

    const getItem = async (id) =>{
        const {
            data: { session },
            } = await supabase.auth.getSession()
            const { user } = session

        let { data } = await supabase
        .from('item')
        .select('*')
        .eq('id', id)
        .single()
        if(data && data.itemuser == user.id){
            setTitle(data.title)
            setDescription(data.description)
            getUsername(data.itemuser)
            generateImages(data.files, id)
        } else {
            navToInvalid('Invalid Item ID.')
        }
    }

    const getUsername = async (id) =>{
        const { data, error } = await supabase
        .from('profiles_public')
        .select('username')
        .eq('id', id)
        .single()
        if(data){setUsername(data.username)} 
    }

    function generateImages(files, id){
        if(files){
            const items = files.map((data)=>
                <Itemimageprivate key = {data} path = {data} id = {id}/>
            )

            setImages(items)
        }
    }

    function navToInvalid(message){
        router.push(message)
    }

    return(
        <div>
            <Navbar />
            <h1>{title}</h1>
            <Sellerpagetitleedit />
            <h2>{description}</h2>
            <Sellerpagedescriptionedit />
            <h3>{username}</h3>
            <Sellerpagedelete />
            <ul>
                {images}
            </ul>
                {sellerpage}
        </div>
    )
}