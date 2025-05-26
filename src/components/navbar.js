import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png"
import axios from "../api/axios"
import { IoChevronDown } from 'react-icons/io5'
import morocco from "../assets/images/morroco.webp";
import french from "../assets/images/french.webp";

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
    <header className="flex [box-shadow:rgba(0,0,0,0.1)_-4px_9px_25px_-6px] py-2 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide sticky top-0 z-50">
      <div className="w-full flex flex-wrap items-center lg:gap-y-4 gap-y-6 gap-x-4 relative">
        <Link to="/">
          <img src={logo} alt="logo" className="w-9 h-9" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden block ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-black" viewBox="0 0 20 20">
            <path d="M2 4h16M2 10h16M2 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Nav Links */}
        <div
          className={`${menuOpen ? 'block' : 'hidden'
            } lg:flex lg:items-center lg:flex-1 fixed lg:static top-0 left-0 w-2/3 max-lg:min-w-[300px] h-full max-lg:h-screen max-lg:bg-white max-lg:shadow-md z-50 px-8 py-4`}
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-4 right-4 z-50 rounded-full bg-white w-9 h-9 border border-gray-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
            </svg>
          </button>

          <ul className="lg:flex lg:gap-x-8 space-y-4 lg:space-y-0 mt-6 lg:mt-0">
            {countryData.map((country) => (
              <li key={country._id} className="relative">
                <button
                  onClick={() => toggleDropdown(country._id)}
                  className="text-slate-900 block text-sm font-semibold hover:text-pink-500 flex items-center gap-1"
                >
                  {country.name}
                  {country.levels?.length > 0 && (
                    <IoChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${openDropdown === country._id ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </button>
                {country.levels?.length > 0 && openDropdown === country._id && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-md rounded z-50 min-w-[160px]">
                    {country.levels.map((level) => (
                      <li key={level._id}>
                        <a
                          onClick={() => navigate(`/level/${level._id}`)}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                        >
                          {level.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="lg:mx-8 max-xl:hidden flex items-center bg-gray-100 px-4 h-10 rounded-sm flex-1 mt-4 lg:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
              className="cursor-pointer fill-gray-500 mr-4 inline-block w-4 h-4">
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
            <input type="text" placeholder="Search something..." className="w-full outline-none text-sm bg-transparent" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center ml-auto">
          <ul className="flex space-x-4 items-center">
            {/* Profile Dropdown */}
            <li className="relative">
              <div
                ref={profileToggleRef}
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex flex-col items-center justify-center cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  className="text-gray-600 group-hover:text-pink-500 transition duration-200"
                >
                  <path
                    fill="currentColor"
                    d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                  />
                </svg>
                <span className="text-xs font-medium mt-1 text-gray-700 group-hover:text-pink-500 transition">
                  Profile
                </span>
              </div>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl w-56 z-30 p-5 transition-all animate-fade-in"
                >
                  <button
                    onClick={() => navigate("/admin")}
                    type="button"
                    className="w-full bg-pink-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition"
                  >
                    Connexion
                  </button>

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="flex justify-between">
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-pink-500 transition">
                      <img src={morocco} alt="Arabic" className="w-5 h-5 rounded-full" />
                      <span>العربية</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-pink-500 transition">
                      <img src={french} alt="Français" className="w-5 h-5 rounded-full" />
                      <span>Français</span>
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
