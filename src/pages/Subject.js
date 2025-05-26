import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../api/axios";
import Navbar from '../components/navbar';
import { FaBookOpen } from 'react-icons/fa';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector'; 

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsRes = await axios.get(`academic/subjects/${id}`);
        setSubjects(subjectsRes.data);
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
        return <IconComponent className="text-[#4335A7] text-xl" />;
      }
    }
    return <FaBookOpen className="text-[#4335A7] text-xl" />;
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

        {/* Subject List */}
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <div
                key={subject._id}
                onClick={() => navigate(`/title/${subject._id}`)}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
              >
                {getSubjectIcon(subject)}
                <span className="text-gray-800 font-medium">{subject.name}</span>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 italic">
              No subjects found for this academic level.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;
