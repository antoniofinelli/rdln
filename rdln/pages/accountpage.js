import { supabase } from '../lib/supabaseClient'
import Loginpanel from './components/loginpanel'
import Navbar from './components/navbar'

import Itemviewer from './components/itemviewer'
import Usernamechangeform from './accountSettings/usernamechangeform'


export default function Account(props) {


    async function signout() {
        const { error } = await supabase.auth.signOut()
    }
    return (
        <div>
            <Navbar />
            <h1>Account Page</h1>
            <Loginpanel />
            <button onClick ={signout}>Sign Out</button>
            <br></br>
            <br></br>
            <Usernamechangeform />
        </div>
    )
  }