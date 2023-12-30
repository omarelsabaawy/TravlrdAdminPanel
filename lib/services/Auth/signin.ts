import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const signIn = async (email: string, password: string): Promise<any> => {
    try {
        const response: AuthResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (response.error || !response.data) {
            throw new Error(`Error Signing in: ${response.error?.message}`);
        }

        const user = response.data.user;

        if (!user) {
            throw new Error('User not found');
        }
    
        const { data, error } = await
            supabase
                .from('Users')
                .select('user_role')
                .filter('email', "like", `%${user.email}%`);
        
        if (error) {
            throw new Error('User role not found');
        }
                
        return {
            user: { user_id: user.id, email: user.email, user_role: data?.at(0)?.user_role },
            success: true
        }
    } catch (error: any) {
        console.error('Error Sign in:', error.message);
    }
};

export default signIn;