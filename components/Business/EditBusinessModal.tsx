"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Spinner from '../Spinner';
import editBusiness from '@/lib/services/Business/editBusiness';

interface EditBusinessProps {
    isEditBusinessModalOpen: boolean;
    businessId: string;
    businessImage: string;
    onClose: () => void;
}

const EditBusinessModal: React.FC<EditBusinessProps> = ({ isEditBusinessModalOpen, onClose, businessId, businessImage }) => {
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
  
    const handleEditBusiness = async (event: any) => {
        event.preventDefault();
        try {
          setLoading(true);
            const response = await editBusiness(businessId, name, businessImage, image);
            router.push("/businesses");
            setLoading(false);
            onClose();
        } catch (error: any) {
          setLoading(false);
          console.error(error.message);
        }
    }

    return (
        <>
            {isEditBusinessModalOpen && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${isEditBusinessModalOpen ? 'flex items-center justify-center' : 'hidden'
                    } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit New Business
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
                        <form className="p-4 md:p-5" onSubmit={handleEditBusiness}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Name</label>
                                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter the Business name" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Business Image</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} id="file_input" type="file" accept="image/*" />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loading ?
                                    <Spinner />
                                    : (
                                        <>
                                        Edit New Business
                                        </>)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBusinessModal;
