import { supabase } from "@/lib/db/supabase";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const editBusiness = async (id: string, name: string, oldImageURL: string, image: any): Promise<any> => {
    
    console.log(id, name, oldImageURL, image);

    if (name) {
        const response = await supabase.from("Businesses").update({ name: name }).eq("id", id);
            
        if (response.error) {
            return toast.error("Error while updating the business");
        }
        
    }

    if (image) {
        const response = await supabase.auth.getUser();

        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(response.data.user?.id + "/" + uuidv4(), image);
        
        if (error) {
            console.error(error);
        }

        const imagePath = data?.path;

        const updateResponse = await supabase
            .from("Businesses")
            .update({
            image: `https://rxigqxorhmitfuguxkiy.supabase.co/storage/v1/object/public/images/${imagePath}`
        }).eq("id", id);
        
        if (updateResponse.error) {
            return toast.error(`${updateResponse.error.message}`);
        }
    }

    return true;
};

export default editBusiness;