import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Itemimage(props){
    const [image, setImage] = useState(null)

    useEffect(()=>{
        getImage()
    },[1])

    const getImage = async ()=>{
        const { data, error } = await supabase.storage.from('public/itemimages').download(props.path)
        setImage(URL.createObjectURL(data))
        if(error){console.log(error)}
    }

    return(
        <div className={props.size}>
            <img className='h-full w-full' src={image}></img>
        </div>
    )
}
