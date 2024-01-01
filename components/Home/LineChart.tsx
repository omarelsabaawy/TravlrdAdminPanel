import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { lineChartData } from '@/lib/services/Home/lineChartData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function LineChart() {
  const [data, setData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
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
      try {
        const userCountsPerDate = await lineChartData();

        const sortedDates = Object.keys(userCountsPerDate);

        const userCounts = sortedDates.map((date) => userCountsPerDate[date]);

        setDates(sortedDates);
        setData(userCounts);
      } catch (error: any) {
        console.error(`Error fetching line chart data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-white mb-2'>Total Admins were created</h2>
      <Chart
      className="bg-white rounded-md"
      options={chartOptions}
      series={[{ name: 'Users', data }]}
      type='line'
      height={400}
      width={500}
    />
    </div>
  );
}

export default LineChart;
