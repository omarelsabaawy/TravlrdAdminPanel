"use client"
import Spinner from "@/components/Spinner";
import signIn from "@/lib/services/Auth/signin";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSignIn = async (event: any): Promise<void> => {
        event.preventDefault();
        try {
            setLoading(true);
            const data: any = await signIn(email, password);
            if (data.success) {
                Cookies.set('userData', JSON.stringify(data.user));
                toast.success("You signed in successfully");
                router.push('/');
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            throw new Error('Failed Sign in');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
            <a className="flex items-center justify-center mb-8 text-3xl font-semibold lg:mb-10 text-white">
                <span>Admin DashBoard</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@xyz.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 sm:w-auto">
                        {loading ? <Spinner /> : "Login to your account"}
                    </button>
                </form>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}

export default SignIn;