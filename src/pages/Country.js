import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import { AiOutlineHome } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaFolderOpen } from 'react-icons/fa';
import { MdOutlineFolderCopy } from 'react-icons/md';

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

        {/* Levels Display */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {levelsData.map((level) => (
            <div
              key={level._id}
              className="bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition p-6"
            >
              {/* Level Header */}
              <div
                onClick={() => navigate(`/level/${level._id}`)}
                className="flex items-center gap-3 cursor-pointer mb-4 hover:underline"
              >
                <FaFolderOpen className="text-2xl text-[#4335A7]" />
                <h2 className="text-xl font-semibold text-[#4335A7]">{level.name}</h2>
              </div>

              {/* Academic Levels */}
              <div className="ml-2 space-y-2">
                {level.academiclevels.length > 0 ? (
                  level.academiclevels.map((academic, idx) => (
                    <div
                      onClick={() => navigate(`/subjects/${academic._id}`)}
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 hover:text-[#4335A7] cursor-pointer transition"
                    >
                      <MdOutlineFolderCopy className="text-lg" />
                      <span className="text-sm">{academic.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400">No academic levels available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Country;
