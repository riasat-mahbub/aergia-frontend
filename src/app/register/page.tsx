"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setName] = useState('');
  const [password, setPassword] = useState('');
  const { execute, loading, error } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await execute(() => 
      apiService.auth.register({ email, password, fullName})
    );
    if (result) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        
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
        
        
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-emerald-500 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}