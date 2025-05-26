import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import { BiWorld } from 'react-icons/bi';
import { FaFolderOpen } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

        {/* Grid section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {countryData.map((country) => (
            <div
              key={country._id}
              className="bg-gray-50 rounded-xl border border-gray-200 hover:shadow-xl transition p-6"
            >
              {/* Country title */}
              <div
                onClick={() => navigate(`/country/${country._id}`)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded transition"
              >
                <BiWorld className="text-3xl text-[#4335A7]" />
                <h2 className="text-2xl font-semibold text-[#4335A7]">{country.name}</h2>
              </div>

              {/* Levels */}
              <div className="mt-5 ml-4 space-y-2">
                {country.levels.length > 0 ? (
                  country.levels.map((level, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/level/${level._id}`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-[#4335A7] cursor-pointer transition"
                    >
                      <FaFolderOpen className="text-base" />
                      <span className="text-sm md:text-base">{level.name}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm italic text-gray-400">No levels available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
