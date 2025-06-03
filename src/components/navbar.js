import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import axios from "../api/axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

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
        setOpenDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b px-5 lg:px-10 py-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <a href="#" className="text-2xl font-bold flex items-center">
        <img src={logo} alt="GoMyclass" className="h-8 w-auto" />
      </a>

      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none">
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-10 text-[18px] font-semibold tracking-wide uppercase text-slate-900 items-center">
        <a href="#" className="hover:text-[#21B573]">Accueil</a>
        <a href="#" className="hover:text-[#21B573]">Formations</a>
        <a href="#" className="hover:text-[#21B573]">Orientation</a>
        <a href="#" className="hover:text-[#21B573]">Classe en direct</a>

        {/* Dropdown Clickable */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-1 hover:text-[#21B573]">
            OFFRES
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openDropdown && (
            <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[180px] z-50">
              <a href="#" className="block px-5 py-2 hover:bg-gray-100">Offre 1</a>
              <a href="#" className="block px-5 py-2 hover:bg-gray-100">Offre 2</a>
            </div>
          )}
        </div>
      </nav>

      {/* Action Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <a
          href="#"
          className="inline-block border border-[#21B573] text-[#21B573] font-medium px-6 py-2 rounded-full hover:bg-[#21B573] hover:text-white transition duration-200"
        >
          Inscription
        </a>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-40 py-4 px-5 space-y-4 text-sm font-semibold uppercase text-gray-800">
          <a href="#" className="block hover:text-[#21B573]">Accueil</a>
          <a href="#" className="block hover:text-[#21B573]">Formations</a>
          <a href="#" className="block hover:text-[#21B573]">Orientation</a>
          <a href="#" className="block hover:text-[#21B573]">Classe en direct</a>

          {/* Offres Mobile Dropdown */}
          <div>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex justify-between items-center w-full hover:text-[#21B573]"
            >
              <span>OFFRES</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown && (
              <div className="mt-2 space-y-2 pl-4">
                <a href="#" className="block hover:text-[#21B573]">Offre 1</a>
                <a href="#" className="block hover:text-[#21B573]">Offre 2</a>
              </div>
            )}
          </div>

          <a
            href="#"
            className="block border border-[#21B573] text-[#21B573] font-medium text-center px-4 py-2 rounded-full hover:bg-[#21B573] hover:text-white transition duration-200"
          >
            Inscription
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
