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

        {/* Tree-like layout - Two columns */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {levelsData.map((level) => (
              <div key={level._id} className="bg-white">
                {/* Academic Level Header */}
                <div
                  onClick={() => navigate(`/subjects/${level._id}`)}
                  className="flex items-center gap-3 p-4 bg-[#4335A7] text-white rounded-lg cursor-pointer hover:bg-[#3730a3] transition-colors shadow-md"
                >
                  {getSubjectIcon({ ...level, icon: level.icon })}
                  <h2 className="text-xl font-semibold">{level.name}</h2>
                </div>

                {/* Subjects with tree structure */}
                {level.subjects.length > 0 && (
                  <div className="relative mt-4 ml-8">
                    {/* Vertical line from level */}
                    <div className="absolute -left-4 top-0 w-px h-full bg-gray-300"></div>
                    
                    {level.subjects.map((subject, idx) => (
                      <div key={idx} className="relative flex items-center mb-3">
                        {/* Horizontal line to subject */}
                        <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-300"></div>
                        
                        {/* Subject item */}
                        <div
                          onClick={() => navigate(`/title/${subject._id}`)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-[#4335A7] transition-all shadow-sm min-w-0 flex-1"
                        >
                          {getSubjectIcon(subject)}
                          <span className="text-gray-700 font-medium">{subject.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No subjects message */}
                {level.subjects.length === 0 && (
                  <div className="ml-8 mt-4 p-3 text-gray-400 italic text-sm">
                    No subjects found
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

export default Levels;