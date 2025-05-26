import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import { AiOutlineHome } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaFolderOpen } from 'react-icons/fa';
import { MdOutlineFolderCopy } from 'react-icons/md';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector';

const Country = () => {
  const [levelsData, setLevelsData] = useState([]);
  const [countryName, setCountryName] = useState("Country");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levelsRes = await axios.get(`country/levels/${id}`);
        const levels = levelsRes.data;
        const countryRes = await axios.get(`country/${id}`);
        setCountryName(countryRes.data.name);

        const promises = levels.map(async (level) => {
          const academicRes = await axios.get(`level/academic/${level._id}`);
          return {
            ...level,
            academiclevels: academicRes.data
          };
        });

        const levelWithAcademics = await Promise.all(promises);
        setLevelsData(levelWithAcademics);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchLevels();
  }, [id]);

  const getLevelIcon = (subject) => {
    if (subject.icon) {
      const iconData = SUBJECT_ICONS.find(icon => icon.name === subject.icon);
      if (iconData) {
        const IconComponent = iconData.icon;
        return <IconComponent className="text-[#4335A7] text-lg" />;
      }
    }
    return <FaFolderOpen className="text-[#4335A7] text-lg" />;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-10 px-4 md:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-700 mb-8 space-x-2">
          <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-[#4335A7] transition">
            <AiOutlineHome className="text-lg" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>

          <span className="flex items-center gap-1 text-gray-600">
            <BiWorld className="text-lg" />
            <span>{countryName}</span>
          </span>
        </nav>

        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#4335A7]">{countryName} – Education Levels</h1>
          <p className="text-gray-600 mt-2 text-lg">Select an education level to explore subjects and resources.</p>
        </div>

        {/* Tree-like layout - Two columns */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {levelsData.map((level) => (
              <div key={level._id} className="bg-white">
                {/* Education Level Header */}
                <div
                  onClick={() => navigate(`/level/${level._id}`)}
                  className="flex items-center gap-3 p-4 bg-[#4335A7] text-white rounded-lg cursor-pointer hover:bg-[#3730a3] transition-colors shadow-md"
                >
                  {getLevelIcon({ ...level, icon: level.icon })}
                  <h2 className="text-xl font-semibold">{level.name}</h2>
                </div>

                {/* Academic Levels with tree structure */}
                {level.academiclevels.length > 0 && (
                  <div className="relative mt-4 ml-8">
                    {/* Vertical line from level */}
                    <div className="absolute -left-4 top-0 w-px h-full bg-gray-300"></div>
                    
                    {level.academiclevels.map((academic, idx) => (
                      <div key={idx} className="relative flex items-center mb-3">
                        {/* Horizontal line to academic level */}
                        <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-300"></div>
                        
                        {/* Academic Level item */}
                        <div
                          onClick={() => navigate(`/subjects/${academic._id}`)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-[#4335A7] transition-all shadow-sm min-w-0 flex-1"
                        >
                          {getLevelIcon(academic)}
                          <span className="text-gray-700 font-medium">{academic.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No academic levels message */}
                {level.academiclevels.length === 0 && (
                  <div className="ml-8 mt-4 p-3 text-gray-400 italic text-sm">
                    No academic levels available
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;