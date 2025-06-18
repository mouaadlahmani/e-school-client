import React, { useState, useEffect } from 'react';
import { Phone, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import mobileApp from "../assets/images/mobileApp.png"
import study from "../assets/images/study.png";
import geniecivil from "../assets/images/geniecivil.jpg"
import Infographie from "../assets/images/Infographie.png"
import Informatique from "../assets/images/informatique.jpg"
import zlij from "../assets/images/zlij.png"
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useSwipeable } from 'react-swipeable';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const BASE_URL = 'https://gomyclassapi.site';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState([]);
  const images = [geniecivil, Informatique, Infographie];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublishedArticles = async () => {
      try {
        const res = await axios.get('/articles/published');
        setArticles(res.data.data.slice(0, 4));
        console.log(res.data.data);

      } catch (error) {
        console.error('Error fetching published articles:', error);
      }
    };
    fetchPublishedArticles();
  }, []);

  const advantages = [
    {
      title: "Cours 100 % en direct",
      description: "Participez à des cours en temps réel, animés par des enseignants expérimentés. Posez vos questions, échangez et interagissez comme en classe."
    },
    {
      title: "Contenus conformes au référentiel du ministère",
      description: "Contenus encadrés et vérifiés par des enseignants qualifiés, en accord parfait avec le programme officiel de l’éducation nationale."
    },
    {
      title: "Qualité audio et vidéo professionnelle",
      description: "Des cours diffusés en haute définition, avec écriture en direct sur iPad et captation sonore en studio pour un confort d’apprentissage optimal."
    },
    {
      title: "Planning flexible",
      description: "Des horaires conçus pour s’adapter à votre emploi du temps. Accédez aux contenus quand vous le souhaitez, à votre rythme."
    },
    {
      title: "Accessibilité totale",
      description: "Depuis un ordinateur, une tablette ou un smartphone-où que vous soyez, quand vous le souhaitez, une simple connexion suffit pour rejoindre votre classe."
    },
    {
      title: "Chat et suivi personnalisé",
      description: "Vous n’êtes jamais seul. Posez vos questions avant et après les lives : nous restons disponibles 7j/7 pour vous accompagner."
    }
  ];

  const formations = [
    {
      title: "Génie civil",
      description: "Formations pratiques pour maîtriser les principaux logiciels du génie civil, tels qu’AutoCAD Civil 3D, Revit ou Covadis... Développez vos compétences pour concevoir, modéliser et gérer efficacement vos projets d’infrastructures.",
      buttonText: "En savoir plus"
    },
    {
      title: "Informatique",
      description: "Formations accessibles aux débutants et professionnels, couvrant la bureautique, le développement web (HTML, CSS, Python), WordPress et bien plus. Acquérez les compétences essentielles pour évoluer dans le monde numérique.  cella est correcte.",
      buttonText: "En savoir plus"
    },
    {
      title: "Infographie",
      description: "Apprenez à créer des contenus visuels attractifs et professionnels avec des outils comme Photoshop, Canva, Figma, Premiere Pro et After Effects. Idéal pour se lancer dans le design graphique et la production multimédia.",
      buttonText: "En savoir plus"
    }
  ];

  const slides = [
    {
      title: "Formations pro 100% en ligne",
      subtitle: "Maîtrisez de nouvelles compétences grâce à nos formations à distance. Choisissez votre programme !",
      buttonText: "Rejoindre une formation",
      imageUrl: "https://www.research4life.org/wp-content/uploads/2019/11/AdobeStock_293567722-2x1.jpg"
    },
    {
      title: "Apprentissage Live et Interactif",
      subtitle: "Accédez à nos classes virtuelles en direct, animées par des professeurs qualifiés. N’hésitez plus !",
      buttonText: "Commencer maintenant",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      title: "L'école d'été",
      subtitle: "un programme parfait pour commencer l'année prochaine en force !",
      buttonText: "S'inscrire à l'école d'été",
      imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/*Slider Section*/}
      <div
        {...handlers}
        className="relative w-full h-[700px] sm:h-[500px] md:h-[550px] lg:h-[700px] overflow-hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentSlide
              ? 'translate-x-0 opacity-100'
              : index < currentSlide
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
              }`}
          >
            <div
              className="w-full h-full flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 text-white relative bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.imageUrl})`
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Animated Background */}
              <div className="absolute inset-0">
                {/* Nodes */}
                <div className="absolute top-12 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-32 right-40 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-300 opacity-70"></div>
                <div className="absolute top-20 right-60 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-700 opacity-70"></div>
                <div className="absolute bottom-40 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-70"></div>
                <div className="absolute bottom-60 right-16 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-500 opacity-70"></div>

                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path d="M 200 80 Q 400 120 600 60" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                  <path d="M 150 150 Q 300 200 450 180" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                  <path d="M 100 300 Q 350 250 600 280" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                  <path d="M 200 400 Q 400 350 650 400" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                </svg>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-5 blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-cyan-400 rounded-full opacity-10 blur-lg animate-pulse delay-1000"></div>
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-4xl text-center lg:text-left">
                <h1 className="text-4xl font-poppins sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 sm:mb-6 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-base font-ibm sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 leading-relaxed opacity-90 font-light max-w-2xl">
                  {slide.subtitle}
                </p>
                <button className="bg-emerald-500 font-ibm hover:bg-emerald-400 text-sm sm:text-base md:text-lg font-medium py-3 px-6 sm:py-4 sm:px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 border-0 outline-none">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows (hidden on mobile) */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={32} className="sm:w-10 sm:h-10" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={32} className="sm:w-10 sm:h-10" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Slider Section */}
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${zlij})` }}
      >
        {/* White overlay with content */}
        <div className="bg-white/90 w-full py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h1 className="text-xl md:text-3xl font-bold font-poppins md:font-semibold mb-4 text-gray-800">
                  Les Avantages De <span className="text-[#21B573]">Go</span>MyClass
                </h1>
                <p className="text-base md:text-lg font-ibm mb-5 leading-relaxed text-gray-700">
                  GoMyClass allie l’excellence pédagogique à la flexibilité du digital.
                  Bénéficiez d’un enseignement en direct, structuré et accessible partout, conçu pour vous accompagner vers la réussite.
                  Cours interactifs, explications claires, supports complets… tout est réuni pour vous faire progresser efficacement, à votre rythme.
                  <br />
                  <br />
                  Rejoignez-nous dès maintenant pour transformer vos efforts en réussite.
                </p>
                <div className="flex justify-center lg:justify-start mt-12">
                  <button className="bg-[#21B573] text-black px-8 py-2.5 rounded-full hover:bg-green-500 transition-all font-semibold text-sm md:text-base">
                    Rejoins GoMyClass
                  </button>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  className="rounded-2xl w-full max-w-sm h-auto object-cover shadow-xl"
                  src={study}
                  alt="GoMyClass"
                />
              </motion.div>
            </div>

            {/* Cards Section */}
            <div className="pt-14">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.2 }}
                viewport={{ once: true }}
              >
                {advantages.map((advantage, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gray-50 p-5 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-xl cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-base font-semibold text-base text-center md:text-lg font-inter text-gray-800 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-base md:text-lg text-center font-ibm leading-relaxed">
                      {advantage.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="flex flex-col w-full items-center py-16 mb-8">
        {/* Right Content */}
        <div>
          <img src={mobileApp} alt='Mobile App' />
        </div>
      </div>

      {/* Formations Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-r-[30px] border-t-[30px] border-l-transparent border-r-transparent border-t-white z-10"></div>

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#21B573] via-[#1a9960] to-[#137a4d]"></div>

        {/* Background Pattern/Shape */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform translate-x-48 -translate-y-48"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold font-ibm text-white mb-6">
              Formations 100 % en ligne.
            </h2>
            <h3 className="text-2xl font-medium font-ibm text-green-100 mb-8">
              Formez-vous à distance
            </h3>
            <p className="text-white/90 max-w-4xl font-ibm mx-auto text-lg leading-relaxed">
              Découvrez nos formations 100 % en ligne, conçues pour vous accompagner dans trois secteurs essentiels : génie civil, informatique et infographie. Que vous soyez étudiant, technicien ou professionnel, développez vos compétences pratiques grâce à des modules flexibles, adaptés à vos besoins et animés par des experts qualifiés. Apprenez à votre rythme, où que vous soyez, avec un suivi personnalisé.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formations.map((formation, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={images[idx]}
                    alt={formation.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {formation.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                    {formation.description}
                  </p>

                  {/* Button */}
                  <button className="w-full flex items-center justify-center gap-3 bg-[#21B573] text-black px-6 py-4 rounded-full hover:bg-[#1a9960] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                    {formation.buttonText}
                    <FaArrowRightLong className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
            <Link to="/blog" className="text-green-600 hover:text-green-700 text-xl font-semibold flex items-center gap-1 group">
              <span>voir plus</span>
              <ArrowRight className="w-6 h-6 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Custom Grid Layout */}
          {articles.length >= 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article) => (
                <div
                  key={article._id}
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 sm:h-56 md:h-64 lg:h-72">
                    {article.thumbnail ? (
                      <img
                        src={`${BASE_URL}${article.thumbnail}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-full flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-500">
                        <BookOpen className="w-16 h-16 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  <div className="p-6 lg:p-8">
                    <h3 className="font-bold text-xl lg:text-2xl text-gray-900 leading-tight group-hover:text-green-600 transition-colors duration-300 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {article.title}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 font-medium">En savoir plus</span>
                      <div className="w-8 h-8 rounded-full bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-xl">Aucun article à afficher pour le moment.</p>
            </div>
          )}

        </div>
      </div>
      {/*footer*/}
      <Footer />
    </div>
  );
};

export default Home;