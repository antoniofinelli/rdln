import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form"

export default function Sellerpagetitleedit(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let params = new URLSearchParams(document.location.search);

        const {error} = await supabase
        .from('item')
        .update({title: data.changetitle})
        .eq('id', params.get("id"))
        if(error){console.log(error)};
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>Change Title </label>
            <input type="text" placeholder="New Title" {...register("changetitle", {required:true})} />

            <input type="submit" />
            </form>
        </div>
    )
}