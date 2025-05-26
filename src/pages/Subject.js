import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../api/axios";
import Navbar from '../components/navbar';
import { FaBookOpen } from 'react-icons/fa';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector'; 

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [academicLevelName, setAcademicLevelName] = useState("Academic Level");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsRes = await axios.get(`academic/subjects/${id}`);
        setSubjects(subjectsRes.data);
        
        // Fetch academic level name for header
        try {
          const academicRes = await axios.get(`academic/${id}`);
          setAcademicLevelName(academicRes.data.name);
        } catch (error) {
          console.log('Could not fetch academic level name');
        }
      } catch (error) {
        console.error('Error fetching subjects:', error.message);
      }
    };
    fetchSubjects();
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
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#4335A7]">Subjects</h1>
          <p className="text-gray-600 mt-2 text-lg">Browse subjects under this academic level</p>
        </div>

        {/* Tree-like layout */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white">
            {/* Academic Level Header */}
            <div className="flex items-center gap-3 p-4 bg-[#4335A7] text-white rounded-lg shadow-md mb-4">
              <FaBookOpen className="text-2xl" />
              <h2 className="text-xl font-semibold">{academicLevelName}</h2>
            </div>

            {/* Subjects with tree structure */}
            {subjects.length > 0 && (
              <div className="relative ml-8">
                {/* Vertical line from academic level */}
                <div className="absolute -left-4 top-0 w-px h-full bg-gray-300"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject, idx) => (
                    <div key={idx} className="relative flex items-center">
                      {/* Horizontal line to subject */}
                      <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-300"></div>
                      
                      {/* Subject item */}
                      <div
                        onClick={() => navigate(`/title/${subject._id}`)}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-[#4335A7] transition-all shadow-sm w-full"
                      >
                        {getSubjectIcon(subject)}
                        <span className="text-gray-700 font-medium">{subject.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No subjects message */}
            {subjects.length === 0 && (
              <div className="ml-8 mt-4 p-4 text-gray-400 italic text-center">
                No subjects found for this academic level.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;