import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";

export default function Sellerpageuploadmorefiles(props){
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) =>{
        if(data){
            console.log(data)
            const {
                data: { session },
                } = await supabase.auth.getSession()
                const { user } = session
        
                var arr = []
                for(var i = 0; i < data.additionalfiles.length; ++i){
                    arr[i] = "userimages/" + data.additionalfiles.item(i).name + data.additionalfiles.item(i).lastModified  
                    uploadFile(data.additionalfiles.item(i), arr[i])
                }
                if(arr){
                    getReferences(arr)
                }else{
                    //TODO :: Error handling
                }
        }
        
    };
    
    const getReferences = async (inArr) =>{
        let { data } = await supabase
        .from('item')
        .select('files')
        .eq('id', props.id)
        .single()
        if(data){
            var arr = data.files
            var tempArr = []
            if(arr){
                tempArr = arr
            }
            inArr.forEach(element => {
                tempArr.push(element)
            });
            updateRecord(tempArr)
        }    

    }

    const updateRecord = async (arr) => {
        const { data, error } = await supabase
        .from('item')
        .update({ files: arr })
        .eq('id', props.id)
        if(error){console.log(error)}
    }

    const uploadFile = async (file, filename) =>{
        const { data, error } = await supabase.storage
        .from('itemimages')
        .upload(filename, file)
        if(error){console.log(error)}
    }

    return(
        <div>
            <label>Add more images:</label>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" multiple accept="image/*" {...register("additionalfiles")} /><br></br>
                <input type="submit" />
            </form>
        </div>
        
    )
}