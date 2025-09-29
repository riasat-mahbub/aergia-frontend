"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import { setIsLoggedIn } from '@/store/authSlice';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { execute, loading, error } = useApi();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await execute(() => 
      apiService.auth.login({ email, password, rememberMe })
    );
    if (result) {
      dispatch(setIsLoggedIn(true));
      router.push('/cvs');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        
        {error && (
          <div className="text-red-500 text-sm">{"Incorrect email or password. Try Again."}</div>
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-emerald-500 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div>
          Dont have an account? register <Link href='/register' className='border-b cursor-pointer'> here </Link>
        </div>
      </form>
    </div>
  );
}