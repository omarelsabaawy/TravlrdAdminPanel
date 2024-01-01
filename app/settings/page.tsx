"use client"

import React, {useState}from 'react';
import NavBars from '@/components/NavBars';
import DeleteButton from '@/components/Settings/DeleteButton';
import DeleteMe from '@/components/Settings/DeleteMe';
import Cookies from 'js-cookie';

function Settings() {
    const userData = Cookies.get('userData');
    const user = userData ? JSON.parse(userData) : null;
    const [isDeleteAdminModalOpen, setIsDeleteAdminModalOpen] = useState<boolean>(false);
    const [currentAdminId, setCurrentAdminId] = useState<string>("");

    const handleOpenDeleteAdmin = (adminId: string) => {
        setCurrentAdminId(adminId);
        setIsDeleteAdminModalOpen(!isDeleteAdminModalOpen);
    };
  
    const handleCloseDeleteAdmin = () => {
        setIsDeleteAdminModalOpen(false);
    };


  const handleDeleteAccount = () => {

  }

  return (
    <div>
      <NavBars />
      <div className="flex-grow p-1">
        <div className="p-1 sm:ml-64">
          <div className="container mx-auto my-40">
            <DeleteMe isDeleteAdminModalOpen={isDeleteAdminModalOpen} onClose={handleCloseDeleteAdmin} adminId={currentAdminId} />
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
                    <DeleteButton  onClick={() => handleOpenDeleteAdmin(user.user_id)}/>
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
};

export default Settings;