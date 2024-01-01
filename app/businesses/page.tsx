"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavBars from '@/components/NavBars';
import AddBusinessButton from '@/components/Business/AddBusinessButton';
import AddBusinessModal from '@/components/Business/AddBusinessModal';
import getBusinesses from '@/lib/services/Business/readBusinesses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteBusinessButton from '@/components/Business/DeleteBusinessButton';
import DeleteBusiness from '@/components/Business/DeleteBusinessModal';
import EditBusinessModal from '@/components/Business/EditBusinessModal';
import EditBusinessButton from '@/components/Business/EditBusinessButton';

const Businesses: React.FC = () => {
    const userData = Cookies.get('userData');
    const user = userData ? JSON.parse(userData) : null;
    const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState<boolean>(false);
    const [isEditBusinessModalOpen, setIsEditBusinessModalOpen] = useState<boolean>(false);
    const [isDeleteBusinessModalOpen, setIsDeleteBusinessModalOpen] = useState<boolean>(false);
    const [currentBusinessId, setCurrentBusinessId] = useState<string>("");
    const [currentBusinessImage, setCurrentBusinessImage] = useState<string>("");
    const [businesses, setBusinesses] = useState<any[]>([]);
    const router = useRouter();

    const handleOpenAddBusiness = () => {
        setIsAddBusinessModalOpen(!isAddBusinessModalOpen);
    };
  
    const handleCloseAddBusiness = () => {
        setIsAddBusinessModalOpen(false);
    };

    const handleOpenEditBusiness = (businessId: string, businessImage: string) => {
        setCurrentBusinessId(businessId);
        setCurrentBusinessImage(businessImage);
        setIsEditBusinessModalOpen(!isEditBusinessModalOpen);
    };
  
    const handleCloseEditBusiness = () => {
        setIsEditBusinessModalOpen(false);
    };


    const handleOpenDeleteBusiness = (BusinessId: string, image: string) => {
        setCurrentBusinessId(BusinessId);
        setCurrentBusinessImage(image);
        setIsDeleteBusinessModalOpen(!isDeleteBusinessModalOpen);
    };
  
    const handleCloseDeleteBusiness = () => {
        setIsDeleteBusinessModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBusinesses();
                setBusinesses(response.businesses);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [user]);
    
    return (
        <div>
            <NavBars />
            <div className="flex-grow p-1">
                <div className="p-1 sm:ml-64">
                    <div className="relative overflow-x-auto overflow-y-auto min-h-96 max-h-96 rounded-md">
                        <AddBusinessModal isAddBusinessModalOpen={isAddBusinessModalOpen} onClose={handleCloseAddBusiness} />
                        <EditBusinessModal isEditBusinessModalOpen={isEditBusinessModalOpen} onClose={handleCloseEditBusiness} businessId={currentBusinessId} businessImage={currentBusinessImage} />
                        <DeleteBusiness isDeleteBusinessModalOpen={isDeleteBusinessModalOpen} onClose={handleCloseDeleteBusiness} businessId={currentBusinessId} businessImage={currentBusinessImage} />
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <div className='flex justify-between'>
                                    <h1 className='text-2xl'>Businesses</h1>
                                    <AddBusinessButton onClick={handleOpenAddBusiness} />
                                </div>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-md">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Business Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Business Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Business Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {businesses && businesses.map((business) => (
                                    <tr key={business.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {business.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {business.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Image src={business.image} alt={business.name} width={50} height={50} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <EditBusinessButton onClick={() => handleOpenEditBusiness(business.id, business.image)} />
                                            <DeleteBusinessButton onClick={() => handleOpenDeleteBusiness(business.id, business.image)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Businesses;