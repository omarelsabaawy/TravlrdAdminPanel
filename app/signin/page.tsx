"use client"

import createSuperAdmin from "@/lib/services/Auth/createSuperAdmin";
import { useEffect } from "react";

export default function SignIn() {

    const createTheFirstAdmin = async (): Promise<void> => {
        const email = 'omarelsabaawy77@gmail.com';

        await createSuperAdmin(email);
        
    }

    useEffect(() => {
        createTheFirstAdmin();
    })

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
        <a className="flex items-center justify-center mb-8 text-3xl font-semibold lg:mb-10 text-white">
            <span>Admin DashBoard</span>  
        </a>
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to platform 
            </h2>
            <form className="mt-8 space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="name@xyz.com"
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Your Password</label>
                      <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                </div>
                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 sm:w-auto dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login to your account</button>
            </form>
        </div>
    </div>
  )
}