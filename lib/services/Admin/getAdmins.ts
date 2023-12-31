import { supabase } from '../../db/supabase';

const getAdmins = async (userRole: string): Promise<any> => {
    const query = userRole === "Super Admin" ?
        supabase.from("Users").select()
        :
        supabase.from("Users").select().eq("user_role", "Admin");

    const { data, error } = await query;

    if (error) {
        throw new Error("Error while fetching the admins " + error.message);
    }

    return data;
};

export default getAdmins;
