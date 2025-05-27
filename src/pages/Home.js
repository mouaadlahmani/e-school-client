import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import { BiWorld, BiPhone, BiMapPin } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { FaFolderOpen, FaGraduationCap, FaUsers, FaBookOpen, FaLightbulb, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { SUBJECT_ICONS } from './admin/SubjectIconSelector';
import header from "../assets/images/header.png"

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

  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-blue-600" />,
      title: "Quality Education",
      description: "Access high-quality educational resources tailored to different academic levels"
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Global Community",
      description: "Connect with students and educators from around the world"
    },
    {
      icon: <FaBookOpen className="text-4xl text-purple-600" />,
      title: "Comprehensive Resources",
      description: "Extensive library of courses, materials, and interactive content"
    },
    {
      icon: <FaLightbulb className="text-4xl text-orange-600" />,
      title: "Innovative Learning",
      description: "Modern teaching methods and cutting-edge educational technology"
    }
  ];

  const stats = [
    { number: "10K+", label: "Students" },
    { number: "500+", label: "Courses" },
    { number: "50+", label: "Countries" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
          {/* Left: Text */}
          <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              {t("header.message")} <span className="text-green-600 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{t("home.body")}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Découvrez une nouvelle façon d'apprendre avec notre plateforme éducative moderne, adaptée à tous les niveaux scolaires.
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t("home.description")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t("home.no_levels")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Primaire, Collège et Lycée</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href='#country'
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                <FaFolderOpen />
                COMMENCER À ÉTUDIER
              </a>
              <button className="inline-flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all">
                EN SAVOIR PLUS
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full max-w-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <img
                src={header}
                alt="École sur Internet"
                className="relative w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#4335A7] to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countries and Levels Section */}
      <div className="bg-gray-50 py-20 px-6" id='country'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explorez par <span className="text-[#4335A7]">Pays et Niveau</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez votre pays pour découvrir les niveaux académiques disponibles et accéder aux ressources adaptées
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {countryData.map((country) => (
              <div key={country._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                {/* Country header */}
                <div
                  onClick={() => navigate(`/country/${country._id}`)}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-[#4335A7] to-blue-600 text-white cursor-pointer hover:from-[#3730a3] hover:to-blue-700 transition-all"
                >
                  <BiWorld className="text-3xl" />
                  <h3 className="text-2xl font-semibold">{country.name}</h3>
                </div>

                {/* Levels */}
                {country.levels.length > 0 && (
                  <div className="p-6">
                    <div className="space-y-3">
                      {country.levels.map((level, idx) => (
                        <div
                          key={idx}
                          onClick={() => navigate(`/level/${level._id}`)}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-[#4335A7] transition-all transform hover:scale-[1.02]"
                        >
                          {getLevelIcon(level)}
                          <span className="text-gray-700 font-medium text-lg">{level.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {country.levels.length === 0 && (
                  <div className="p-6 text-center text-gray-400 italic">
                    Aucun niveau disponible pour le moment
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is E-School Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Qu'est-ce que <span className="text-[#4335A7]">E-School</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              E-School est une plateforme éducative révolutionnaire qui transforme l'apprentissage en ligne
              en offrant des ressources pédagogiques de qualité, adaptées aux différents systèmes éducatifs mondiaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-[#4335A7]">Contactez-nous</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vous avez des questions ? Notre équipe est là pour vous aider
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <MdEmail className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">contact@e-school.com</p>
                  <p className="text-gray-600">support@e-school.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <BiPhone className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-gray-600">+33 1 98 76 54 32</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <BiMapPin className="text-2xl text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Adresse</h3>
                  <p className="text-gray-600">123 Rue de l'Éducation</p>
                  <p className="text-gray-600">75001 Paris, France</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4335A7] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4335A7] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4335A7] focus:border-transparent outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Sujet"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4335A7] focus:border-transparent outline-none transition-all"
                />
                <textarea
                  placeholder="Message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4335A7] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4335A7] to-blue-600 hover:from-[#3730a3] hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02]"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#4335A7]">E-School</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Votre plateforme éducative de référence pour un apprentissage moderne et accessible à tous.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Liens Rapides</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cours</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Subjects */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Matières</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mathématiques</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sciences</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Langues</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Histoire</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Géographie</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutoriels</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Communauté</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2024 E-School. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions d'utilisation</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions légales</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;