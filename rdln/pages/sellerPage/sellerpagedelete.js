import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form"

export default function Sellerpagedelete(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let params = new URLSearchParams(document.location.search);

        const {error} = await supabase
        .from('item')
        .delete()
        .eq('id', params.get("id"))
        if(error){console.log(error)};    
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>Type in 'delete' and press submit to delete item. </label>
            <input type="text" placeholder="Type name" {...register("deleteitem",{required: true, pattern: /delete/i})} />

            <input type="submit"/>
            </form>
        </div>
    )
}