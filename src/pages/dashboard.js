import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { PiArticleNyTimesLight } from "react-icons/pi";
import { BsLayoutTextWindowReverse } from "react-icons/bs";

const Dashboard = () => {
  const [stats, setStats] = useState({
    inscrires: 0,
    inscription: 0,
    articles: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inscrireRes, inscriptionRes, articlesRes] = await Promise.all([
          axios.get('/applies/sInscrire'),
          axios.get('/applies/inscription'),
          axios.get('/articles'),

        ]);
        
        setStats({
          inscrires: inscrireRes.data.length,
          inscription: inscriptionRes.data.length,
          articles: articlesRes.data.data.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    { label: 'Inscriptions', value: stats.inscription, nav: '/applies', icon: <FaUsers size={28} />, color: 'from-green-400 to-green-500' },
    { label: 'Formation Inscriptions', value: stats.inscrires, nav: '/inscriptions', icon: <BsLayoutTextWindowReverse size={28} />, color: 'from-blue-400 to-blue-500' },
    { label: 'Articles', value: stats.articles, nav: '/blogs', icon: <PiArticleNyTimesLight size={28} />, color: 'from-yellow-400 to-yellow-500' }
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">📊 Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {cardData.map(({ label, value, icon, color, nav }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(nav)}
              className={`bg-white/80 backdrop-blur-md border border-white/30 cursor-pointer shadow-md rounded-2xl p-5 flex flex-col items-center justify-center transition hover:scale-[1.03] hover:shadow-xl`}
            >
              <div className={`bg-gradient-to-br ${color} text-white rounded-full p-3 mb-3`}>
                {icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
              <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;