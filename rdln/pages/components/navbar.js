import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import Link from "next/link";
export default function Navbar(props) {

    const [username, setUsername] = useState(null);

    useEffect(()=>{
        getCurrentUser()
    },[1])

    const getCurrentUser = async ()=>{
        const { data } = await supabase.from('profiles_private').select('id, username, country').single()
        if(data){setUsername('Welcome, ' + data.username)}
    }

    return (
        <div className="flex px-5 py-2 shadow-lg w-full">
            <h1 className= "mr-10 text-2xl">RDLN</h1>
            <Link className = "pr-5" href = 'accountpage'>Account</Link><br></br>
            <Link className = "pr-5" href = 'sellerpage'>Seller</Link><br></br>
            <Link className = "pr-5" href = 'homepage'>Homepage</Link>
            <div>
                <h2 className="float-r w-full">{username}</h2>
            </div>

        </div>
    )
  }