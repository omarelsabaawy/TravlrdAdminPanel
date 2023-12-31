import { supabase } from '../../db/supabase';

const deleteAdmin = async (adminId: string): Promise<any> => {
    try {
        
        const { error } = await supabase
            .from('Users')
            .delete()
            .eq('user_id', adminId);
        
        if (error) {
            throw new Error(error.message);
        }

        return true;
    } catch (error: any) {
        throw new Error("Error while deleting an admin " + error.message);
    }
};

export default deleteAdmin;