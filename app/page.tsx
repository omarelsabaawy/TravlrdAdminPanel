"use client"
import NavBars from '@/components/NavBars';
import PieChart from '@/components/Home/PieChart';
import LineChart from '@/components/Home/LineChart';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <div>
      <NavBars />
      <div className="flex-grow ">
        <div className=" sm:ml-60">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-1 p-0">
              <div className="flex items-center justify-center h-50 rounded">
                <PieChart />
              </div>
              <div className="flex items-center justify-center mt-2 h-50 rounded">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default Home;
