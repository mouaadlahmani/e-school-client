import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import { Phone } from 'lucide-react';
import { TbWorld } from "react-icons/tb";
import { GiRotaryPhone } from "react-icons/gi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
    <>
      <div className="bg-[#21B573] text-white px-4 py-2 text-sm overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-6 min-w-full">
          {/* Phones */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <GiRotaryPhone className="w-6 h-6 flex-shrink-0" />
              <span className="text-2xl font-semibold">05 23 41 93 46</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="text-2xl font-semibold">06 07 77 06 07</span>
            </div>
          </div>


          {/* Roles + Language */}
          <div className="flex items-center gap-4">
            <span className="flex space-x-6 font-semibold cursor-pointer">
              <span className='font-bold'>Étudiant</span>
              <span>Enseignant</span>
              <span>Entreprise</span>
            </span>
            <TbWorld className="w-6 h-6 text-white flex-shrink-0" />
          </div>
        </div>
      </div>
      <header className="bg-white border-b px-5 lg:px-10 py-6 flex items-center justify-between relative z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src={logo} alt="GoMyclass" className="h-8 w-auto" />
        </Link>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-10 text-[18px] font-semibold tracking-wide uppercase text-slate-900 items-center">
          <Link
            to="/"
            className={`hover:text-[#21B573] ${currentPath === '/' ? 'text-[#21B573]' : ''}`}
          >
            Accueil
          </Link>
          <Link
            to="/formation"
            className={`hover:text-[#21B573] ${currentPath === '/formation' ? 'text-[#21B573]' : ''}`}
          >
            Formations
          </Link>
          <Link
            to="/orientation"
            className={`hover:text-[#21B573] ${currentPath === '/orientation' ? 'text-[#21B573]' : ''}`}
          >
            Orientation
          </Link>
          <Link
            to="/direct"
            className={`hover:text-[#21B573] ${currentPath === '/direct' ? 'text-[#21B573]' : ''}`}
          >
            Classe en direct
          </Link>

          {/* Dropdown OFFRES */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center gap-1 hover:text-[#21B573] ${openDropdown ? 'text-[#21B573]' : ''}`}
            >
              OFFRES
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[180px] z-50">
                <Link to="/2bac" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors">2Bac</Link>
                <Link to="/1bac" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors">1Bac</Link>
                <Link to="/tronccommun" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors">Tronc commun</Link>
                <Link to="/college" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors">College</Link>
                <Link to="/councours" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors">Concours postbac</Link>
              </div>
            )}

          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/inscription"
            className="inline-block border border-[#21B573] text-[#21B573] font-medium px-6 py-2 rounded-full hover:bg-[#21B573] hover:text-white transition duration-200"
          >
            Inscription
          </Link>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-40 py-4 px-5 space-y-4 text-sm font-semibold uppercase text-gray-800">
            <Link to="/" className="block hover:text-[#21B573]">Accueil</Link>
            <Link to="/formation" className="block hover:text-[#21B573]">Formations</Link>
            <Link to="/orientation" className="block hover:text-[#21B573]">Orientation</Link>
            <Link to="/direct" className="block hover:text-[#21B573]">Classe en direct</Link>

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
                <div className="mt-2 space-y-1 pl-4">
                  <Link
                    to="/2bac"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors"
                  >
                    2Bac
                  </Link>
                  <Link
                    to="/1bac"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors"
                  >
                    1Bac
                  </Link>
                  <Link
                    to="/tronccommun"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors"
                  >
                    Tronc commun
                  </Link>
                  <Link
                    to="/college"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors"
                  >
                    College
                  </Link>
                  <Link
                    to="/councours"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#21B573] transition-colors"
                  >
                    Concours postbac
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/inscription"
              className="block border border-[#21B573] text-[#21B573] font-medium text-center px-4 py-2 rounded-full hover:bg-[#21B573] hover:text-white transition duration-200"
            >
              Inscription
            </Link>
          </div>
        )}
      </header>
    </>

  );
};

export default Navbar;
