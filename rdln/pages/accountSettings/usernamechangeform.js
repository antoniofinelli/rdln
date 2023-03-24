import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form";

export default function Usernamechangeform(props) {
    
    const [username, setUsername] = useState(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const {
            data: { session },
            } = await supabase.auth.getSession()
            const { user } = session

        const { error } = await supabase
        .from('profiles_private')
        .update({ username: data.usernameform })
        .eq('id', user.id)
        if(error){console.log(error)}

        const { error_private } = await supabase
        .from('profiles_public')
        .update({ username: data.usernameform })
        .eq('id', user.id)
        if(error_private){console.log(error_private)}
    };

    useEffect(()=>{
        getCurrentUser()
    },[1])

    const getCurrentUser = async ()=>{
        const { data } = await supabase.from('profiles_private').select('id, username').single()
        if(data){setUsername(data.username)}
    }

    return (
        <div>
            <h2>Current Username</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={username} {...register("usernameform", { required: true })} />
            {errors.usernameform && <span>Username cannot be null.</span>}
            <input type="submit" />
            </form>
        </div>
        
    )
  }