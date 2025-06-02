import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png"
import axios from "../api/axios"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const toggleDropdown = (countryId) => {
    setOpenDropdown(openDropdown === countryId ? null : countryId);
  };

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

  const dropdownRef = useRef(null);
  const profileToggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileToggleRef.current &&
        !profileToggleRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="relative bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <a href="#" className="text-2xl font-bold flex items-center">
        <img src={logo} alt="GoMyclass" className="h-8 w-auto" />
      </a>

      {/* Mobile menu button */}
      <button
        className="lg:hidden text-gray-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex space-x-6 text-[15px] font-medium text-slate-900">
        <a href="#" className="font-bold text-black">Accueil</a>
        <a href="#">Formations</a>
        <a href="#">Orientation</a>
        <a href="#">Classe en direct</a>

        {/* Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1">
            Offres
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded p-2 min-w-[150px] z-50">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Offre 1</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Offre 2</a>
          </div>
        </div>
      </nav>

      {/* Signup button */}
      <a
        href="#"
        className="hidden lg:inline-block bg-[#21B573] text-black font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Inscription
      </a>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-2 text-sm font-medium lg:hidden z-50">
          <a href="#" className="text-black font-bold">Accueil</a>
          <a href="#">Formations</a>
          <a href="#">Orientation</a>
          <a href="#">Classe en direct</a>
          <details className="w-full">
            <summary className="cursor-pointer flex items-center gap-1">
              Offres
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-2 ml-4">
              <a href="#" className="block py-1">Offre 1</a>
              <a href="#" className="block py-1">Offre 2</a>
            </div>
          </details>
          <a
            href="#"
            className="bg-[#21B573] text-black px-4 py-2 rounded-md hover:bg-green-600 transition w-full text-center"
          >
            Inscription
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
