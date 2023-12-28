// pages/reset-password/[token].tsx
"use client"
import { useState } from 'react';

const ResetPasswordPage = ({ params }: {
  params: {
    userId: string
  }
}) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = () => {
    // Implement logic to reset the password using the token and new password
    // ...

    // Redirect the user to a dashboard if success
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow">
            <h2 className="text-center text-2xl font-bold text-gray-900">
                Rest your password
            </h2>
            <form className="mt-8 space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                      <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                      <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                </div>
                <div className="flex items-center justify-center">
                  <button type="submit" className="px-5 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login to your account</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ResetPasswordPage;
