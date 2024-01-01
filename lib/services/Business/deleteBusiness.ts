import { supabase } from "@/lib/db/supabase";

const deleteBusiness = async (businessId: string, image: string): Promise<any> => {
    try {
        const { error } = await supabase
            .from('Businesses')
            .delete()
            .eq('id', businessId);
        
        if (error) {
            console.log(error);
        }

        const folder = image.split('/').slice(-2)[0];
        const file = image.split('/').slice(-2)[1];
        const response = await supabase
            .storage
            .from('images')
            .remove([`${folder}/${file}`]);
        
        console.log(response);

        return true;
    } catch (error) {
        console.log(error);
    }
}

export default deleteBusiness;