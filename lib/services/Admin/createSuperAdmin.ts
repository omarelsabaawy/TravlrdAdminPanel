import toast from 'react-hot-toast';
import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const createSuperAdmin = async (email: string): Promise<any> => {
    try {
      const randomPassword = "123456789";

      const response: AuthResponse = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_CONFIRM_EMAIL_URL
        },
      });

      if (response.error || !response.data) {
        return toast.error(`${response.error?.message}`);
      }

      const user = response.data.user;

      if (!user) {
        return toast.error("User not found");
      }
      
      await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${process.env.NEXT_PUBLIC_RESET_PASSWORD_URL}/${user.email}`,
      })
    
      await supabase
      .from('Users')
      .upsert({
        user_id: user.id,
        email: user.email,
        user_role: 'Super Admin',
        isDeleted: false
      });

      return true;
  } catch (error: any) {
    console.error('Error creating super admin:', error.message);
  }
};

export default createSuperAdmin;
