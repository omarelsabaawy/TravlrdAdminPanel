"use client"

import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import updateAdmin from '@/lib/services/Admin/updateAdmin';
import { useRouter } from 'next/navigation';

interface EditAdminProps {
  isEditAdminModalOpen: boolean;
  adminId: string;
  adminEmail: string;
  adminRole: string;
  onClose: () => void;
}

const EditAdmin: React.FC<EditAdminProps> = ({ isEditAdminModalOpen, onClose, adminId, adminEmail, adminRole }) => {
  const [email, setEmail] = useState<string>(adminEmail);
  const [userRole, setUserRole] = useState<string>(adminRole);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setEmail(adminEmail);
    setUserRole(adminRole);
  }, [adminEmail, adminRole]);


  const handleEditAdmin = async (event: any) => {
    event.preventDefault();
    try {
      
      setLoading(true);

      const response = await updateAdmin(adminId, email, userRole);

      if (response) {
        setLoading(false);
        router.refresh();
        onClose();
      }

    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
    }
  }

  return (
    <>
      {isEditAdminModalOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${isEditAdminModalOpen ? 'flex items-center justify-center' : 'hidden'
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Admin
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleEditAdmin}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter the new admin email" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Role</label>
                  <select id="AdminRole" value={userRole} onChange={(e)=>{setUserRole(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {loading ?
                  <Spinner />
                  : (
                  <>
                  Edit Admin
                </>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAdmin;
