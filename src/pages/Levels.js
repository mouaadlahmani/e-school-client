import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { MdOutlineFolderCopy } from 'react-icons/md';
import { FaBookOpen } from 'react-icons/fa';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector'; 

const Levels = () => {
  const [levelsData, setLevelsData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAcademicLevels = async () => {
      try {
        const levelsRes = await axios.get(`level/academic/${id}`);
        const academiclevels = levelsRes.data;

        const promises = academiclevels.map(async (level) => {
          const subjectsRes = await axios.get(`/academic/subjects/${level._id}`);
          return {
            ...level,
            subjects: subjectsRes.data
          };
        });

        const academicLevelWithSubjects = await Promise.all(promises);
        setLevelsData(academicLevelWithSubjects);
      } catch (error) {
        console.error("Error fetching academic levels and subjects:", error.message);
      }
    };

    fetchAcademicLevels();
  }, [id]);

  const getSubjectIcon = (subject) => {
    if (subject.icon) {
      const iconData = SUBJECT_ICONS.find(icon => icon.name === subject.icon);
      if (iconData) {
        const IconComponent = iconData.icon;
        return <IconComponent className="text-[#4335A7] text-lg" />;
      }
    }
    return <FaBookOpen className="text-[#4335A7] text-lg" />;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-10 px-4 md:px-12">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#4335A7]">Academic Levels & Subjects</h1>
          <p className="text-gray-600 mt-2 text-lg">Explore all subjects organized by academic levels</p>
        </div>

        {/* Academic Levels Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {levelsData.map((level) => (
            <div
              key={level._id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              {/* Academic Level Header */}
              <div
                onClick={() => navigate(`/subjects/${level._id}`)}
                className="flex items-center gap-2 cursor-pointer mb-4 group"
              >
                <MdOutlineFolderCopy className="text-2xl text-[#4335A7] group-hover:scale-110 transition" />
                <h2 className="text-xl font-semibold text-[#4335A7] group-hover:underline">{level.name}</h2>
              </div>

              {/* Subjects List */}
              <div className="space-y-2">
                {level.subjects.length > 0 ? (
                  level.subjects.map((subject) => (
                    <div
                      key={subject._id}
                      onClick={() => navigate(`/title/${subject._id}`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-[#4335A7] cursor-pointer transition"
                    >
                      {getSubjectIcon(subject)}
                      <span className="text-sm">{subject.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400 ml-1">No subjects found</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Levels;
