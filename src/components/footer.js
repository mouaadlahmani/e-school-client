import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdLocalPhone, MdLocationOn, MdMailOutline } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaBlogger, FaSquareXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { BsFillThreadsFill } from "react-icons/bs";
import { GiRotaryPhone } from "react-icons/gi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { AiFillTikTok } from "react-icons/ai";

const footer = () => {
    return (
        <>
            {/* CTA Section - positioned overlapping the footer */}
            <div className="relative z-10">
                <div className="bg-[#21B573] rounded-xl py-8 px-6 w-full max-w-4xl mx-auto -mb-12 relative shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center text-white gap-4 px-6">
                        <p className="text-base md:text-lg font-medium max-w-2xl leading-relaxed text-center mx-auto">
                            <span className='font-bold'>GoMyClass</span> : votre apprentissage à portée de click, partout,<br />
                            à tout moment.
                        </p>
                        <button className="bg-white text-[#21B573] px-8 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold whitespace-nowrap">
                            Commencer maintenant →
                        </button>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <footer className="bg-black text-white pt-40 pb-6 px-2">
                <div className="max-w-[90rem] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center mb-8">

                        {/* Brand Column */}
                        <div className="text-center md:text-left">
                            <h3 className="text-4xl font-poppins font-bold mb-1 text-white">
                                <span className="text-[#21B573]">Go</span>MyClass
                            </h3>
                            <p className="text-sm text-[#D1D5DB] font-semibold mb-6 md:ml-20">Navigate to Success</p>
                            <div className="space-y-3 text-lg flex flex-col items-center font-semibold md:items-start">
                                <button className="flex justify-center items-center gap-2 bg-[#21B573] text-white px-6 py-0.5 rounded-full w-52 hover:bg-[#1a9d63] transition-colors">
                                    <MdLocalPhone className="w-5 h-5" /> 06 07 77 06 07
                                </button>
                                <button className="flex justify-center items-center gap-2 bg-[#21B573] text-white px-6 py-0.5 rounded-full w-52 hover:bg-[#1a9d63] transition-colors">
                                    <GiRotaryPhone className="w-5 h-5" /> 05 23 41 93 46
                                </button>
                                <button className="flex justify-center items-center gap-1 bg-[#21B573] text-white px-6 py-0.5 rounded-full w-52 hover:bg-[#1a9d63] transition-colors">
                                    <MdLocationOn className="w-5 h-5" /> Où nous trouver
                                </button>
                                <button className="flex justify-center items-center gap-2 bg-[#21B573] text-white px-6 py-0.5 rounded-full w-52 hover:bg-[#1a9d63] transition-colors">
                                    <MdMailOutline className="w-5 h-5" /> Nous Contacter
                                </button>
                            </div>
                        </div>

                        {/* Information Column */}
                        <div className="text-center text-3xl font-inter md:text-left">
                            <h4 className="font-semibold mb-8 mt-2 text-white">Informations</h4>
                            <ul className="space-y-3 text-base text-gray-300">
                                <li><Link to="#" className="hover:text-white transition-colors">Qui sommes-nous</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Conditions Générales d’Utilisation</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Termes et Conditions</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Politique d’Annulation</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Foire aux Questions (FAQ)</Link></li>
                            </ul>
                        </div>

                        {/* Quick Access Column */}
                        <div className="text-center font-inter md:text-left">
                            <h4 className="font-semibold text-3xl mb-8 mt-2 text-white">Accès rapides</h4>
                            <ul className="space-y-3 text-base text-gray-300">
                                <li><Link to="/formation" className="hover:text-white transition-colors">Formations</Link></li>
                                <li><Link to="/orientation" className="hover:text-white transition-colors">Orientation</Link></li>
                                <li><Link to="/direct" className="hover:text-white transition-colors">Classe en direct</Link></li>
                                <li><Link to="/2bac" className="hover:text-white transition-colors">Offres</Link></li>
                                <li><Link to="inscription" className="hover:text-white transition-colors">Inscription</Link></li>
                                <li><Link to="blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Social Media Column */}
                        <div className="text-center text-3xl md:text-left">
                            <h4 className="font-semibold mb-8 mt-2 font-inter text-white">Restons connectés</h4>

                            {/* Social Icons Grid - 4 per row */}
                            <div className="grid grid-cols-4 gap-4 mb-6 max-w-56 ml-12 mx-auto md:mx-0 place-items-center">
                                {/* First Row */}
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <ImFacebook2 className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaInstagram className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <BsFillThreadsFill className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaLinkedin className="w-10 h-10" />
                                </a>

                                {/* Second Row */}
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <PiYoutubeLogoLight className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaSquareXTwitter className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <AiFillTikTok className="w-10 h-10" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaBlogger className="w-10 h-10" />
                                </a>
                            </div>

                            <div className="flex justify-center md:justify-start items-center gap-2 text-[#21B573] text-4xl font-bold">
                                <FaWhatsapp className="w-10 h-10 mt-1" />
                                <span>0607 <span className="text-white">77</span> 0607</span>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Bar */}
                    <div className="pt-12 text-center text-sm text-white">
                        © 2025 GoMyClass. Tous droits réservés.
                    </div>
                </div>
            </footer>
        </>
    )
}

export default footer