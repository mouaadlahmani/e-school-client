import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { MdLocalPhone, MdLocationOn, MdMailOutline } from "react-icons/md";
import { FaLinkedin, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { Phone } from 'lucide-react';
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
            <footer className="bg-black text-white pt-24 pb-6 px-2">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center mb-8">

                        {/* Brand Column */}
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-poppins font-bold mb-1 text-white">
                                <span className="text-[#21B573]">Go</span>MyClass
                            </h3>
                            <p className="text-sm text-gray-400 mb-6 md:ml-12">Navigate to Success</p>
                            <div className="space-y-3 text-sm flex flex-col items-center md:items-start">
                                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-40 hover:bg-[#1a9d63] transition-colors">
                                    <MdLocalPhone className="w-4 h-4" /> 06 07 77 06 07
                                </button>
                                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-40 hover:bg-[#1a9d63] transition-colors">
                                    <Phone className="w-4 h-4" /> 05 23 41 93 46
                                </button>
                                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-40 hover:bg-[#1a9d63] transition-colors">
                                    <MdLocationOn className="w-4 h-4" /> Où nous trouver
                                </button>
                                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-40 hover:bg-[#1a9d63] transition-colors">
                                    <MdMailOutline className="w-4 h-4" /> Nous Contacter
                                </button>
                            </div>
                        </div>

                        {/* Quick Access Column */}
                        <div className="text-center font-inter md:text-left">
                            <h4 className="font-semibold text-2xl mb-8 mt-2 text-white">Accès rapides</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">Formations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Orientation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Classe en direct</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Offres</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Inscription</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Information Column */}
                        <div className="text-center text-2xl font-inter md:text-left">
                            <h4 className="font-semibold mb-8 mt-2 text-white">Informations</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Conditions générales d'utilisation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Politique d'annulation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Social Media Column */}
                        <div className="text-center text-2xl md:text-left">
                            <h4 className="font-semibold mb-8 mt-2 font-inter text-white">Restons connectés</h4>

                            <div className="flex items-center gap-4 mb-6 flex-wrap">
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaYoutube className="w-7 h-7" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <ImFacebook2 className="w-7 h-7" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaInstagram className="w-7 h-7" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaLinkedin className="w-7 h-7" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <BsTwitterX className="w-7 h-7" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-2xl flex justify-center">
                                    <FaTiktok className="w-7 h-7" />
                                </a>
                            </div>

                            <div className="flex justify-center md:justify-start items-center gap-2 text-[#21B573] text-3xl font-bold">
                                <FaWhatsapp className="w-9 h-9 mt-0.5" />
                                <span>0607 <span className="text-white">77</span> 0607</span>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Bar */}
                    <div className="pt-6 text-center text-sm text-white">
                        © 2025 GoMyClass. Tous droits réservés.
                    </div>
                </div>
            </footer>
        </>
    )
}

export default footer