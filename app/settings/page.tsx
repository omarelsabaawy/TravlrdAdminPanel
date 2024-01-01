"use client"

import React from 'react';
import NavBars from '@/components/NavBars';
import Cookies from 'js-cookie';

function Settings() {
  const userData = Cookies.get('userData');
  const user = userData ? JSON.parse(userData) : null;

  const handleDeleteAccount = () => {

  }

  return (
    <div>
      <NavBars />
      <div className="flex-grow p-1">
        <div className="p-1 sm:ml-64">
          <div className="container mx-auto my-40">
            <div>
              <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="flex justify-center"></div>
                <div className="mt-10">
                  <h1 className="font-bold text-center text-3xl text-gray-900">
                    {`Hello ${ user && (user.email).split('@')[0]} !`}
                  </h1>
                  <p className="text-center text-sm text-gray-400 font-medium">
                    {user && user.userRole}
                  </p>
                  <div className="my-5 px-6">
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full justify-center text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-700 hover:bg-red-600 hover:text-white"
                    >
                      Delete your account
                    </button>
                  </div>
                  <div className="flex justify-between items-center my-10 px-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
