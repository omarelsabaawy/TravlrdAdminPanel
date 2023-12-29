import { supabase } from '../../db/supabase';
import Cookies from 'js-cookie';

const Logout = async (): Promise<any> => {
    try {
        const {error} = await supabase.auth.signOut();

        if (error) {
            throw new Error(`Error Logout: ${error?.message}`);
        }
        
        Cookies.remove('userData');

        return {
            success: true
        }

    } catch (error: any) {
        console.error('Error Sign in:', error.message);
    }
};

export default Logout;