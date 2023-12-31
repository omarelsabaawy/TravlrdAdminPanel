import { supabase } from "@/lib/db/supabase";

const fetchUserData = async (role: string): Promise<number> => {
  try {
    const response: any = await supabase.from('Users').select().filter('user_role', 'eq', role);
    return response.data.length;
  } catch (error: any) {
    console.error(`Error fetching ${role} data: ${error.message}`);
    return 0;
  }
};

const pieChartData = async (): Promise<{ superAdmins: number; admins: number }> => {
  try {
    const [superAdminsCount, adminsCount] = await Promise.all([
      fetchUserData('Super Admin'),
      fetchUserData('Admin'),
    ]);

    return { superAdmins: superAdminsCount, admins: adminsCount };
  } catch (error: any) {
    console.error(`Error fetching pie chart data: ${error.message}`);
    return { superAdmins: 0, admins: 0 };
  }
};

export default pieChartData;
