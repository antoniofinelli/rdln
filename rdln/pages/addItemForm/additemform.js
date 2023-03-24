import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";
export default function Additemform(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) =>{
            const {
            data: { session },
            } = await supabase.auth.getSession()
            const { user } = session

            
            var arr = []
            for(var i = 0; i < data.files.length; ++i){
                arr[i] = "userimages/" + data.files.item(i).name + data.files.item(i).lastModified  
                uploadFile(data.files.item(i), arr[i])
            }

            const { error } = await supabase
            .from('item')
            .insert([
                {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    type: 0,
                    itemuser: user.id,
                    files: arr
                }
            ])
            if(error){console.log(error)}
    };

    const uploadFile = async (file, filename) =>{
        const { data, error } = await supabase.storage
        .from('itemimages')
        .upload(filename, file)
        if(error){console.log(error)}
    }
    
    return (
        <div>
            <h2>Create new listing</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title")} /><br></br>
                <input type="text" placeholder="Description" {...register("description")} /><br></br>
                <input type="number" placeholder="Price" {...register("price")} /><br></br>
                <input type="file" multiple accept="image/*" {...register("files")} /><br></br>

                <input type="submit" />
            </form>
        </div>
    )
  }