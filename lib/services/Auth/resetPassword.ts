import toast from 'react-hot-toast';
import { supabase } from '../../db/supabase';

const resetPassword = async (newPassword: string): Promise<any> => {
    try {

        const response: any = await supabase.auth.updateUser({ password: newPassword });

        if (!response.data || response.error) {
            return toast.error(`${response.error.message}`);
        }

        return true;

    } catch (error: any) {
        console.error('Error Resetting password:', error.message);
    }
};

export default resetPassword;