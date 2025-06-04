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
                <div className="bg-[#21B573] rounded-xl py-6 px-6 w-full max-w-4xl mx-auto -mb-14 relative shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center text-white gap-4 px-6">
                        <p className="text-base md:text-lg font-medium max-w-2xl leading-relaxed text-center md:text-left">
                            Rejoignez notre plateforme 100 % en ligne et accédez à des cours scolaires et à des formations professionnelles, où que vous soyez.            </p>
                        <button className="bg-white text-[#21B573] px-8 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold whitespace-nowrap">
                            Commencer maintenant →
                        </button>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <footer className="bg-black text-white py-16 px-4">
                <div className="w- mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand Column */}
                        <div>
                            <h3 className="text-3xl font-poppins font-bold mb-1 text-white"><span className='text-[#21B573]'>Go</span>MyClass</h3>
                            <p className="text-sm text-gray-400 mb-6 ml-12">Navigate to Success</p>
                            <div className="space-y-3 text-sm">
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
                        <div>
                            <h4 className="font-semibold mb-4 text-white">Accès rapides</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">Formations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Orientation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Classe en direct</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Offres</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Inscription</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Information Column */}
                        <div>
                            <h4 className="font-semibold mb-4 text-white">Informations</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Conditions générales d'utilisation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Politique d'annulation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Social Media Column */}
                        <div>
                            <h4 className="font-semibold mb-4 text-white">Restons connectés</h4>
                            <div className="flex gap-3 mb-4">
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <ImFacebook2 className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <BsTwitterX className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <FaYoutube className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <FaTiktok className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white hover:text-[#21B573] transition-colors text-xl">
                                    <FaTelegram className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="flex items-center gap-1 text-[#21B573] text-xl font-bold">
                                <FaWhatsapp className="w-6 h-6 mt-0.5" />
                                <span>0607 <span className='text-white'>77</span> 0607</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default footer