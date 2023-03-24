import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useForm } from 'react-hook-form';

export default function Itemimageprivate(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState(null)

    useEffect(()=>{
        getImage()
    },[1])

    const onSubmit = async (data) => {
        getReferences()
    }
    const getImage = async ()=>{
        const { data, error } = await supabase.storage.from('public/itemimages').download(props.path)
        setImage(URL.createObjectURL(data))
        if(error){console.log(error)}
    }

    const getReferences = async ()=>{
        let { data } = await supabase
        .from('item')
        .select('files')
        .eq('id', props.id)
        .single()
        if(data){
            var arr = data.files
            var parsedArr = []
            const found = arr.find(elem => elem == props.path) 
            arr.forEach(element => {
                if(element != found){
                    parsedArr.push(element)
                }
            });
            if(found){
                deleteImage(parsedArr)
            }else{
                //TODO :: Add error handling here
            }
        }    
    }

    const deleteImage = async (parsedArr)=>{


        var arr = []
        arr.push(props.path)
        const { data, dberror } = await supabase
        .storage
        .from('itemimages')
        .remove(arr)
        if(dberror){console.log(dberror)}

        const {error} = await supabase
        .from('item')
        .update({files: parsedArr})
        .eq('id',props.id)
        if(error){console.log(error)};
    }

    return(
        <div>
            <h2>{props.id}</h2>
            <h3>{props.path}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Type in 'delete' and press submit to delete item. </label>
                <input type="text" placeholder="Type name" {...register(props.path,{required: true, pattern: /delete/i})} />
                <input type="submit"/>
            </form>
            <img src={image}></img>
        </div>
    )
}
