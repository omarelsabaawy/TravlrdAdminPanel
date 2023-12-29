"use client"

import React, { useState } from 'react'
import Chart from 'react-apexcharts';

function PieChart() {
  const [data, setData] = useState<number[]>([1, 3]);
    const chartOptions = {
    labels: ['Super Admins', 'Admins'],
    colors: ['#FF6384', '#36A2EB'],
  };
  return (
    <Chart options={chartOptions} series={data} type='pie' height={400} width={400}/>
  )
}

export default PieChart