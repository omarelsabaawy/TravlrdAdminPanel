import { supabase } from "@/lib/db/supabase";
import { v4 as uuidv4 } from 'uuid';

const editBusiness = async (id: string, name: string, oldImageURL: string, image: any): Promise<any> => {
    
    console.log(id, name, oldImageURL, image);

    if (name) {
        const response = await supabase.from("Businesses").update({ name: name }).eq("id", id);
            
        if (response.error) {
            throw new Error("Error while updating the business");
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
            console.log(error);
        }
    }

    return true;
    // try {
    //     if (name !== "" && image !== null) {
    //         const folder = oldImageURL.split('/').slice(-2)[0];
    //         const file = oldImageURL.split('/').slice(-2)[1];

    //         const { data, error } = await supabase
    //             .storage
    //             .from('avatars')
    //             .update(`${folder}/${file}`, image);
            
    //         if (error) {
    //             throw new Error("Error while updating your image");
    //         }

    //         const response = await supabase.from("Businesses").update({ name: name }).eq("id", id);
            
    //         if (response.error) {
    //             throw new Error("Error while updating the business");
    //         }

    //         return true;
    //     } else if (image !== "") {
    //         const folder = oldImageURL.split('/').slice(-2)[0];
    //         const file = oldImageURL.split('/').slice(-2)[1];

    //         const { data, error } = await supabase
    //             .storage
    //             .from('avatars')
    //             .update(`${folder}/${file}`, image);
            
    //         if (error) {
    //             throw new Error("Error while updating your image");
    //         }

    //         return true;
    //     } else {
    //         const response = await supabase.from("Businesses").update({ name: name }).eq("id", id);
            
    //         if (response.error) {
    //             throw new Error("Error while updating the business");
    //         }

    //         return true;
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
};

export default editBusiness;