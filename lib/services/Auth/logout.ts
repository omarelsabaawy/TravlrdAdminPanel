import toast from 'react-hot-toast';
import { supabase } from '../../db/supabase';
import Cookies from 'js-cookie';

const Logout = async (): Promise<any> => {
    try {
        const {error} = await supabase.auth.signOut();

        if (error) {
            return toast.error(`${error.message}`);
        }
        
        Cookies.remove('userData');

        return true;

    } catch (error: any) {
        console.error('Error Sign in:', error.message);
    }
};

export default Logout;