import React, { useContext, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";

const LOGIN_URL = 'auth/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post(LOGIN_URL, form);
            const { token } = res.data;

            if (token) {
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                setAuth({
                    role: decoded.role,
                    authenticated: true
                });
                navigate('/dashboard');
            } else {
                setError('Login failed: Invalid response');
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
            >
                <div className="flex justify-center mb-2">
                    <img src={logo} alt="eSchool Logo" className="h-21 w-21" />
                </div>
                <p className="text-sm text-center text-gray-500 mb-6">
                    Please enter your credentials to access your account.
                </p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 text-red-600 text-sm text-center font-medium"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                        />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4335A7] text-white font-semibold py-2 rounded-lg hover:bg-[#372c88] transition duration-200"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </motion.button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} e-School. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
