import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const createSuperAdmin = async (email: string): Promise<void> => {
    try {
        const randomPassword = "123456789";
        const response: AuthResponse = await supabase.auth.signUp({ email, password: randomPassword });

        if (response.error || !response.data) {
            throw new Error(`Error creating super admin: ${response.error?.message}`);
        }

        const user = response.data.user;

        if (!user) {
            throw new Error('User not found in response');
        }

        console.log('Super admin created successfully:', user);

  } catch (error: any) {
    console.error('Error creating super admin:', error.message);
  }
};

export default createSuperAdmin;
