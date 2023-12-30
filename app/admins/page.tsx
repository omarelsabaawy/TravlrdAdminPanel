"use client"
import React, { useEffect, useState } from 'react'
import NavBars from '@/components/NavBars';
import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';
import AddAdminButton from '@/components/Admin/AddAdminButton';
import AddAdmin from '@/components/Admin/AddAdmin';

const Admins: React.FC = () => {
    // const userData = Cookies.get('userData');
    // const user = userData ? JSON.parse(userData) : null;
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState<boolean>(false);

    const handleOpenAddAdmin = () => {
        setIsAddAdminModalOpen(!isAddAdminModalOpen);
    };
  
    const handleCloseAddAdmin = () => {
        setIsAddAdminModalOpen(false);
    };
    return (
        <div>
            <NavBars />
            <div className="flex-grow p-1">
                <div className="p-1 sm:ml-64">
                    <div className="relative overflow-x-auto overflow-y-auto min-h-96 max-h-96 rounded-md">
                        <AddAdmin isAddAdminModalOpen={isAddAdminModalOpen} onClose={handleCloseAddAdmin} />
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <div className='flex justify-between'>
                                    <h1 className='text-2xl'>Admin users</h1>
                                    {/* {user?.user_role === "Super Admin" && (
                                        <AddAdminButton onClick={handleOpenAddAdmin}/>
                                    )} */}
                                </div>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-md">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Admin Id
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Admin Email
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Admin Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {/* {
                                            user?.user_role === "Super Admin" ? "Actions" : <del>Actions</del>
                                        } */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* {
                                            user?.user_role === "Super Admin" ?
                                                <div>
                                                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                                    <a href="#" className="font-medium text-red-600 hover:underline ml-3">Delete</a>
                                                </div>
                                                :
                                                <div>
                                                    <del className="font-medium text-blue-600">Edit</del>
                                                    <del className="font-medium text-red-600 ml-3">Delete</del>
                                                </div>
                                        } */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 flex justify-end">
                        <button className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded">
                            Prev
                        </button>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admins