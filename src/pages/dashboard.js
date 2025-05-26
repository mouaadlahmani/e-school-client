import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import { Globe, BookOpen, Layers, FolderOpen, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    countries: 0,
    levels: 0,
    subjects: 0,
    titles: 0,
    folders: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, levelsRes, subjectsRes, titlesRes, foldersRes] = await Promise.all([
          axios.get('/country'),
          axios.get('/level'),
          axios.get('/subject'),
          axios.get('/title'),
          axios.get('/folder')
        ]);

        setStats({
          countries: countriesRes.data.length,
          levels: levelsRes.data.length,
          subjects: subjectsRes.data.length,
          titles: titlesRes.data.length,
          folders: foldersRes.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    { label: 'Countries', value: stats.countries, nav: '/countries', icon: <Globe size={28} />, color: 'from-green-400 to-blue-500' },
    { label: 'Levels', value: stats.levels, nav: '/levels', icon: <Layers size={28} />, color: 'from-purple-400 to-pink-500' },
    { label: 'Subjects', value: stats.subjects, nav: '/subjects', icon: <BookOpen size={28} />, color: 'from-yellow-400 to-red-500' },
    { label: 'Titles', value: stats.titles, nav: '/titles', icon: <FolderOpen size={28} />, color: 'from-indigo-400 to-purple-500' },
    { label: 'Folders', value: stats.folders, nav: '/folders', icon: <Map size={28} />, color: 'from-rose-400 to-orange-500' }
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