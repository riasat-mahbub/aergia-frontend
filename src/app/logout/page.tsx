"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import { setIsLoggedIn } from '@/store/authSlice';
import Spinner from '@/components/Spinner';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { execute } = useApi();

  useEffect(() => {
    const handleLogout = async () => {
      const result = await execute(() => apiService.auth.logout());
      
      if (result) {
        dispatch(setIsLoggedIn(false));
      }
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    };

    handleLogout();
  }, [dispatch, router, execute]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">😢</div>
      <h1 className="text-2xl font-bold mb-4">Sad to see you go!</h1>
      <Spinner />
      <p className="mt-4 text-gray-600">Logging you out...</p>
    </div>
  );
}