import { supabase } from '../../db/supabase';

const getAdmins = async (userRole: string): Promise<any> => {
    const query = userRole === "Super Admin" ?
        supabase.from("Users").select().neq("isDeleted", "true")
        :
        supabase.from("Users").select().eq("user_role", "Admin").neq("isDeleted", "true");

    const { data, error } = await query;

    if (error) {
        throw new Error("Error while fetching the admins " + error.message);
    }

    return data;
};

export default getAdmins;
