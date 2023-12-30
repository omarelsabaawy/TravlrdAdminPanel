"use client"
import { useEffect } from 'react';
import NavBars from '@/components/NavBars';
import PieChart from '@/components/PieChart';

const Home = () => {
  return (
    <div>
      <NavBars />
      <div className="flex-grow p-1">
        <div className="p-1 sm:ml-64">
          <div className="p-1">
            <div className="grid grid-cols-1 gap-4 mb-1">
              <div className="flex items-center justify-left mt-2 h-50 rounded">
                {/* <PieChart /> */}
              </div>
              <div className="flex items-center justify-left mt-2 h-50 rounded bg-gray-50 dark:bg-gray-800">
                Line Chart should be here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
