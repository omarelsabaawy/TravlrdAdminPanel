import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { lineChartData } from '@/lib/services/Home/lineChartData';
import Spinner from '../Spinner';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function LineChart() {
  const [data, setData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chartOptions = {
    xaxis: {
      categories: dates,
      labels: {
        rotate: -45,
        formatter: function (value: any) {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    colors: ['#36A2EB'],
    dataLabels: {
      enabled: false,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userCountsPerDate = await lineChartData();

        const sortedDates = Object.keys(userCountsPerDate);

        const userCounts = sortedDates.map((date) => userCountsPerDate[date]);

        setDates(sortedDates);
        setData(userCounts);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error(`Error fetching line chart data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-white mb-2'>Total Admins were created</h2>
      {loading ? <Spinner /> : (
        <Chart
      className="bg-white rounded-md"
      options={chartOptions}
      series={[{ name: 'Users', data }]}
      type='line'
      height={350}
      width={450}
    />)}
    </div>
  );
}

export default LineChart;
