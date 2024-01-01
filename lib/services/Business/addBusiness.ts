import { supabase } from "@/lib/db/supabase";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const addNewBusiness = async (name: string, image: any): Promise<any> => {
    try {
        const response = await supabase.auth.getUser();

        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(response.data.user?.id + "/" + uuidv4(), image);
        
        if (error) {
            return toast.error(`${error.message}`);
        }

        const imagePath = data?.path;

        const newBusiness = await supabase
            .from('Businesses')
            .insert(
                {
                    name: name,
                    image: `https://rxigqxorhmitfuguxkiy.supabase.co/storage/v1/object/public/images/${imagePath}`
                });
        
        if (newBusiness.error) {
            return toast.error(`${newBusiness.error.message}`);
        }

        return true;

    } catch (error: any) {
        throw new Error("Error While Creating new Business ", error.message);
    }
}

export default addNewBusiness;