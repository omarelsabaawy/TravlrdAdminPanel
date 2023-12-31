import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const signIn = async (email: string, password: string): Promise<any> => {
    try {

        const userExists: any = await supabase.from("Users").select().eq("email", email);

        if (userExists.data.length === 0) {
            throw new Error("User Doesn't exists");
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
            user: { user_id: user.id, email: user.email, userRole: data?.at(0)?.user_role },
            success: true
        }
    } catch (error: any) {
        console.error('Error Sign in:', error.message);
    }
};

export default signIn;