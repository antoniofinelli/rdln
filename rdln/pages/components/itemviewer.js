import React, { useEffect, useState } from 'react';
import {supabase} from '../../lib/supabaseClient'
import Itemcard from './itemcard';


export default function Itemviewer(props) {
    const [items, setItems] = useState(null);

    useEffect(()=>{
        if(props.private == true){
            getItemsPrivate()
        }else{
            getItems()
        }
    },[1])

    const getItems = async ()=>{
        let { data } = await supabase
        .from('item')
        .select('*')
        if(data){generateItemCards(data)}    
    }

    const getItemsPrivate = async ()=>{
        const{
            data: {session}, 
        } = await supabase.auth.getSession()
        if(session){
            const {user} = session
            let { data } = await supabase
            .from('item')
            .select('*')
            .eq('itemuser', user.id)
            if(data){generateItemCards(data)}    
        }
    }

    const generateItemCards = (data) =>{
        const items = data.map((data)=>
            <Itemcard thumbnail = {true} key = {data.id} id = {data.id} files = {data.files} title = {data.title} price ={data.price} description = {data.description} user = {data.itemuser} private = {props.private}/>
        )
        setItems(items);
    }

    return (
        <ul className='flex flex-wrap'>
            {items}
        </ul>
    )
  }