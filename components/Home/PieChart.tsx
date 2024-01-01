import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import pieChartData from '@/lib/services/Home/pieChartData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PieChart() {
  const [data, setData] = useState<number[]>([1, 3]);
  const chartOptions = {
    labels: ['Super Admins', 'Admins'],
    colors: ['#FF6384', '#36A2EB'],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { superAdmins, admins } = await pieChartData();
        setData([superAdmins, admins]);
      } catch (error: any) {
        console.error(`Error fetching pie chart data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-white mb-2'>Existing Super Admins vs Admins</h2>
      <Chart className="bg-white rounded-md" options={chartOptions} series={data} type='pie' height={450} width={500} />
    </div>
  );
}

export default PieChart;
