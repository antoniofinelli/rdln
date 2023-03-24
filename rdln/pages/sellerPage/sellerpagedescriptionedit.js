import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form"

export default function Sellerpagedescriptionedit(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let params = new URLSearchParams(document.location.search);

        const {error} = await supabase
        .from('item')
        .update({description: data.changedescription})
        .eq('id', params.get("id"))
        if(error){console.log(error)};
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>Change Description </label>
            <input type="text" placeholder="New Description" {...register("changedescription", {required:true})} />

            <input type="submit" />
            </form>
        </div>
    )
}