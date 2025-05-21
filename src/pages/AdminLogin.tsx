import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      setError('');

      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Missing Supabase environment variables');
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/admin-dashboard-x7k9p2`,
          scopes: 'user:email'
        }
      });

      if (error) {
        throw error;
      }

      if (data) {
        navigate('/admin-dashboard-x7k9p2');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login with GitHub. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in with your GitHub account to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="flex items-center p-4 text-red-300 bg-red-900/50 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="h-5 w-5 mr-2" />
            {loading ? 'Signing in...' : 'Sign in with GitHub'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;