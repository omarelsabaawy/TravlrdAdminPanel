// pages/reset-password/[token].tsx
"use client"
import Spinner from '@/components/Spinner';
import resetPassword from '@/lib/services/Auth/resetPassword';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ResetPasswordPage = ({ params }: {
  params: {
    userEmail: string
  }
}) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async (event: any): Promise<any> => {
    event.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      alert("passwords should be the same");
      return;
    }

    const response: any = await resetPassword(password);

    if (response) {
      toast.success("Thanks for setting your password.")
      router.push('/signin');
      setLoading(false);
    } else {
      alert("failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow">
            <h2 className="text-center text-2xl font-bold text-gray-900">
                Reset your password
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                      <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="********"
                          onChange={(e)=>setPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                      <input
                          type="password"
                          name="ConfirmPassword"
                          id="ConfirmPassword"
                          placeholder="********"
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                </div>
                <div className="flex items-center justify-center">
            <button type="submit" className="px-5 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">{loading ? <Spinner /> : "Reset your password"}</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ResetPasswordPage;
