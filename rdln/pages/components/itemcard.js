import React, { useEffect, useState } from 'react';
import {supabase} from '../../lib/supabaseClient'
import { Slide } from 'react-slideshow-image';

import Itemimage from './itemimage';
import Link from 'next/link';
export default function Itemcard(props) {
    const [username, setUsername] = useState(null) 
    const [images, setImages] = useState(null) 
    const [thumbnail, setThumbnail] = useState(null) 
    const [targetURL, setTargetURL] = useState(null)

    useEffect(()=>{
        getUsername()
        generateImages()
        if(props.private == false){
            setTargetURL("itemviewpage?id="+props.id)
        }else{
            setTargetURL("privateitemviewpage?id="+props.id)
        }

    },[1])

    const getUsername = async ()=>{
        let { data, error } = await supabase
        .from('profiles_public')
        .select('username')
        .eq('id', props.user)
        .single()
        if(data){setUsername(data.username)} 
    }

    function generateImages(){
        const items = props.files.map((data)=>
        <div className='each-slide-effect h-[80%]'>
             <Itemimage key = {data} path = {data} size = {"w-full px-2"}/>
        </div>)

        setImages(items)
        
    }



    return(
        <li className=''>
            {/* <Link href = {String(targetURL)}> */}
                <div className=' border border-black m-5 w-64 h-64 shadow-xl hover:shadow-2xl'>
                    <div className=' h-[10%]'>
                        <h1 className='px-2'>{props.title}</h1>
                    </div>
                    <Slide duration={500} easing={'cubic-out'}>
                     {images} 
                     {thumbnail}
                     </Slide>
                    <div className='w-full px-2 h-[15%]'>
                        <h2 className='inline w-fit'>{username}</h2>
                        <h2 className='inline w-fit float-right'>{'$' + props.price + '.00'}</h2>
                    </div>
                </div>
            {/* </Link> */}
        </li>
    )
  }