import { supabase } from "@/lib/db/supabase";
import toast from "react-hot-toast";

const getBusinesses = async (): Promise<any> => {
    try {
        const response = await supabase.from('Businesses').select();

        if (response.error) {
            return toast.error(`${response.error.message}`);
        }

        return {
            businesses: response.data,
            success: true
        }
    } catch (error: any) {
        throw new Error("Error while fetching data", error.message);
    }
}

export default getBusinesses;