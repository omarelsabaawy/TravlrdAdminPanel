import toast from 'react-hot-toast';
import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const signIn = async (email: string, password: string): Promise<any> => {
    try {

        const { data: userExists, error: userExistsError } = await supabase
            .from('Users')
            .select()
            .eq('email', email);

        if (userExistsError) {
            return toast.error(`${userExistsError.message}`);
        }

        if (userExists.length === 0 || userExists[0].isDeleted === "true") {
            return toast.error("Sorry, This user doesn't exist");
        }

        const response: AuthResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        await supabase.auth.updateUser({
            data: {
                roles: ['admin']
            }
        });

        if (response.error || !response.data) {
            return toast.error(`${response.error?.message}`);
        }

        const user = response.data.user;

        if (!user) {
            return toast.error("User not found");
        }
    
        const { data, error } = await
            supabase
                .from('Users')
                .select('user_role')
                .filter('email', "like", `%${user.email}%`);
        
        if (error) {
            return toast.error("User not found");
        }
                
        return {
            user: { user_id: user.id, email: user.email, userRole: data?.at(0)?.user_role },
            success: true
        }
    } catch (error: any) {
        console.error('Error Sign in:', error.message);
    }
};

export default signIn;