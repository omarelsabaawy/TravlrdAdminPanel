import { supabase } from '../../db/supabase';

const updateAdmin = async (adminId: string, adminEmail: string, adminRole: string): Promise<any> => {
    try {

        const { error } = await supabase
            .from('Users')
            .update({
                email: adminEmail,
                user_role: adminRole
            })
            .eq("user_id", adminId);
        
        if (error) {
            throw new Error("Error while updating the admin" + error.message);
        }
        
        return true;

    } catch (error: any) {
        throw new Error("Error while Updating an admin " + error.message);
    }
}

export default updateAdmin;