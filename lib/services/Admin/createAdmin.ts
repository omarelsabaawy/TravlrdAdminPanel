import { supabase } from '../../db/supabase';
import { AuthResponse } from '@supabase/supabase-js';

const createAdmin = async (email: string): Promise<void> => {
    try {
      const randomPassword = "123456789";
      
      const response: AuthResponse = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          emailRedirectTo: process.env.NEXT_APP_CONFIRM_EMAIL_URL
        }
      });

      if (response.error || !response.data) {
          throw new Error(`Error creating admin: ${response.error?.message}`);
      }

      const user = response.data.user;

      if (!user) {
          throw new Error('User not found in response');
      }
      
      await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${process.env.NEXT_APP_RESET_PASSWORD_URL}/${user.email}`,
      })
    
      await supabase
      .from('Users')
      .upsert({
        user_id: user.id,
        email: user.email,
        user_role: 'Admin'
      });
      
  } catch (error: any) {
    console.error('Error creating admin:', error.message);
  }
};

export default createAdmin;
