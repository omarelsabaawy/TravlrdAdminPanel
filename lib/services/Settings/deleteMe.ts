import { supabase } from '../../db/supabase';

const deleteMe = async (adminId: string): Promise<any> => {
    try {
        
        const { error } = await supabase
            .from('Users')
            .update({isDeleted: "true"})
            .eq('user_id', adminId);
        
        if (error) {
            throw new Error(error.message);
        }

        return true;
    } catch (error: any) {
        throw new Error("Error while deleting your account " + error.message);
    }
};

export default deleteMe;