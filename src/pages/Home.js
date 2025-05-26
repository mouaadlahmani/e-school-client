import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import { BiWorld } from 'react-icons/bi';
import { FaFolderOpen } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector';

const Home = () => {
  const [countryData, setCountryData] = useState([]);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const fetchCountriesAndLevels = async () => {
      try {
        const countryRes = await axios.get('country');
        const countries = countryRes.data;
        const promises = countries.map(async (country) => {
          const levelsRes = await axios.get(`country/levels/${country._id}`);
          return {
            ...country,
            levels: levelsRes.data
          };
        });
        const countriesWithLevels = await Promise.all(promises);
        setCountryData(countriesWithLevels);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchCountriesAndLevels();
  }, []);

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
      <div className="bg-white min-h-screen pt-10 px-4 md:px-12">
        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4335A7] leading-tight">
            {t("home.heroTitle", "Find Educational Resources by Country and Level")}
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            {t("home.heroSubtitle", "Choose a country to browse its academic levels and resources")}
          </p>
        </div>

        {/* Tree-like layout - Two columns */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {countryData.map((country) => (
              <div key={country._id} className="bg-white">
                {/* Country header */}
                <div 
                  onClick={() => navigate(`/country/${country._id}`)}
                  className="flex items-center gap-3 p-4 bg-[#4335A7] text-white rounded-lg cursor-pointer hover:bg-[#3730a3] transition-colors shadow-md"
                >
                  <BiWorld className="text-2xl" />
                  <h2 className="text-xl font-semibold">{country.name}</h2>
                </div>

                {/* Levels with tree structure */}
                {country.levels.length > 0 && (
                  <div className="relative mt-4 ml-8">
                    {/* Vertical line from country */}
                    <div className="absolute -left-4 top-0 w-px h-full bg-gray-300"></div>
                    
                    {country.levels.map((level, idx) => (
                      <div key={idx} className="relative flex items-center mb-3">
                        {/* Horizontal line to level */}
                        <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-300"></div>
                        
                        {/* Level item */}
                        <div
                          onClick={() => navigate(`/level/${level._id}`)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-[#4335A7] transition-all shadow-sm min-w-0 flex-1"
                        >
                          {getLevelIcon(level)}
                          <span className="text-gray-700 font-medium">{level.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No levels message */}
                {country.levels.length === 0 && (
                  <div className="ml-8 mt-4 p-3 text-gray-400 italic text-sm">
                    No levels available
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

export default Home;