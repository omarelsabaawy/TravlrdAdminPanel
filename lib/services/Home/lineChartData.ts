import { supabase } from "@/lib/db/supabase";

export const lineChartData = async (): Promise<any> => {
    try {
        const response = await supabase
            .from('Users')
            .select(
                'created_at',
                { count: 'exact' },
            );

        const data = response?.data;
       
        const dayCounts: { [day: string]: number } = {};

        data?.forEach((item) => {
            const day = new Date(item.created_at).toLocaleDateString();

            if (dayCounts[day]) {
                dayCounts[day]++;
            } else {
                dayCounts[day] = 1;
            }
        });

        return dayCounts;

    } catch (error: any) {
        console.error(`Error fetching user data: ${error.message}`);
        return [];
    }
};
