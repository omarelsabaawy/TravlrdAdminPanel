import { supabase } from "@/lib/db/supabase";

const getBusinesses = async (): Promise<any> => {
    try {
        const response = await supabase.from('Businesses').select();

        if (response.error) {
            console.error(response.error);
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