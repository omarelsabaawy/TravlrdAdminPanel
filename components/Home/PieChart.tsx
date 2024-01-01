import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import pieChartData from '@/lib/services/Home/pieChartData';
import Spinner from '../Spinner';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PieChart() {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chartOptions = {
    labels: ['Super Admins', 'Admins'],
    colors: ['#FF6384', '#36A2EB'],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { superAdmins, admins } = await pieChartData();
        setData([superAdmins, admins]);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error(`Error fetching pie chart data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-white mb-2'>Existing Super Admins vs Admins</h2>
      {loading ? <Spinner /> : <Chart className="bg-white rounded-md" options={chartOptions} series={data} type='pie' height={450} width={450} />
      }
    </div>
  );
}

export default PieChart;
