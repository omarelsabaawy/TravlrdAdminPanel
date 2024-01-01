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

        // Sort the dates in ascending order
        const sortedDates = Object.keys(dayCounts).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        const sortedDayCounts: { [day: string]: number } = {};
        sortedDates.forEach((day) => {
            sortedDayCounts[day] = dayCounts[day];
        });

        return sortedDayCounts;

    } catch (error: any) {
        console.error(`Error fetching user data: ${error.message}`);
        return [];
    }
};
