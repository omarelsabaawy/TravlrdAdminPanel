"use client"
import React, { useEffect, useState } from 'react'
import NavBars from '@/components/NavBars';
import Cookies from 'js-cookie';
import AddAdminButton from '@/components/Admin/AddAdminButton';
import AddAdmin from '@/components/Admin/AddAdmin';
import EditAdminButton from '@/components/Admin/EditAdminButton';
import DeleteAdminButton from '@/components/Admin/DeleteAdminButton';
import EditAdmin from '@/components/Admin/EditAdmin';
import DeleteAdmin from '@/components/Admin/DeleteAdmin';
import getAdmins from '@/lib/services/Admin/getAdmins';
import { Toaster } from 'react-hot-toast';

const Admins: React.FC = () => {
    const userData = Cookies.get('userData');
    const user = userData ? JSON.parse(userData) : null;
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState<boolean>(false);
    const [isEditAdminModalOpen, setIsEditAdminModalOpen] = useState<boolean>(false);
    const [isDeleteAdminModalOpen, setIsDeleteAdminModalOpen] = useState<boolean>(false);
    const [currentAdminId, setCurrentAdminId] = useState<string>("");
    const [currentAdminEmail, setCurrentAdminEmail] = useState<string>("");
    const [currentAdminRole, setCurrentAdminRole] = useState<string>("");
    const [admins, setAdmins] = useState<any[]>([]);

    const handleOpenAddAdmin = () => {
        setIsAddAdminModalOpen(!isAddAdminModalOpen);
    };
  
    const handleCloseAddAdmin = () => {
        setIsAddAdminModalOpen(false);
    };

    const handleOpenEditAdmin = (adminId: string, adminEmail: string, adminRole: string) => {
        setCurrentAdminId(adminId);
        setCurrentAdminEmail(adminEmail);
        setCurrentAdminRole(adminRole);
        setIsEditAdminModalOpen(!isEditAdminModalOpen);
    };
  
    const handleCloseEditAdmin = () => {
        setIsEditAdminModalOpen(false);
    };

    const handleOpenDeleteAdmin = (adminId: string) => {
        setCurrentAdminId(adminId);
        setIsDeleteAdminModalOpen(!isDeleteAdminModalOpen);
    };
  
    const handleCloseDeleteAdmin = () => {
        setIsDeleteAdminModalOpen(false);
    };

    useEffect(() => {
        const fetchAdmins = async () => {
            const data = await getAdmins(user.userRole);
            setAdmins(data);
        };
        fetchAdmins();
    }, [user]);

    return (
        <div>
            <NavBars />
            <div className="flex-grow p-1">
                <div className="p-1 sm:ml-64">
                    <div className="relative overflow-x-auto overflow-y-auto min-h-96 max-h-96 rounded-md">
                        <AddAdmin isAddAdminModalOpen={isAddAdminModalOpen} onClose={handleCloseAddAdmin} />
                        <EditAdmin isEditAdminModalOpen={isEditAdminModalOpen} onClose={handleCloseEditAdmin} adminId={currentAdminId} adminEmail={currentAdminEmail} adminRole={currentAdminRole} />
                        <DeleteAdmin isDeleteAdminModalOpen={isDeleteAdminModalOpen} onClose={handleCloseDeleteAdmin} adminId={currentAdminId} />
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <div className='flex justify-between'>
                                    <h1 className='text-2xl'>Admin users</h1>
                                    {user?.userRole === "Super Admin" && (
                                        <AddAdminButton onClick={handleOpenAddAdmin} />
                                    )}
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
                                        {
                                            user?.userRole === "Super Admin" ? "Actions" : <></>
                                        }
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length === 0 ? (
                                    <>Not found</>
                                ) : (
                                    admins.map((admin) => (
                                        <tr key={admin.user_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {admin.user_id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {admin.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {admin.user_role}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.user_id === admin.user_id ? <></> :user?.userRole === "Super Admin" ? (
                                                    <div>
                                                        <EditAdminButton onClick={() => handleOpenEditAdmin(admin.user_id, admin.email, admin.user_role)} />
                                                        <DeleteAdminButton onClick={() => handleOpenDeleteAdmin(admin.user_id)} />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}

export default Admins