"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '@/store/authSlice';
import { apiService } from '@/services/api';

export function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await apiService.auth.isLoggedIn();
        dispatch(setIsLoggedIn(!!result));
      } catch {
        dispatch(setIsLoggedIn(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}