import { supabase } from "../../lib/supabaseClient"
export default function Loginpanel(props) {
    
    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
    }

    return (
        <div>
            <button onClick ={signInWithGoogle}>Sign in With Google</button>
        </div>
    )
  }