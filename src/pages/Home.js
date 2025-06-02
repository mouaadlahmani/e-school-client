import React, { useState, useEffect } from 'react';
import { Phone, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import mobileApp from "../assets/images/mobileApp.png"
import { TbWorld } from "react-icons/tb";
import header from "../assets/images/header.png"
import study from "../assets/images/study.png"
import Navbar from '../components/navbar';
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdLocalPhone, MdLocationOn, MdMailOutline } from "react-icons/md";
import { FaLinkedin, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderContent = [
    {
      title: "",
      subtitle: "",
      description: "",
      cta: ""
    }
  ];

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
      description: "Formations pratiques pour maîtriser les principes fondamentaux du génie civil, les matériaux de construction et les techniques de chantier. Apprenez avec des concepts modernes et gérez efficacement vos projets d'infrastructure.",
      buttonText: "En savoir plus"
    },
    {
      title: "Informatique",
      description: "Formations accessibles aux débutants et professionnels, couvrant la bureautique, le développement web, la programmation et WordPress et bien plus. Acquérez les compétences recherchées pour évoluer dans le secteur du numérique.",
      buttonText: "En savoir plus"
    },
    {
      title: "Infographie",
      description: "Apprenez à créer des contenus visuels impactants et professionnels avec des outils comme Photoshop, Illustrator et InDesign. Pro et Etat-Effects. Idéal pour se lancer dans le design graphique et la communication.",
      buttonText: "En savoir plus"
    }
  ];

  const blogPosts = [
    {
      title: "Comment rester motivé(e) pendant les formations à distance"
    },
    {
      title: "Débuter en infographie : outils et conseils pratiques"
    },
    {
      title: "Comment réussir son premier projet web en HTML & CSS"
    },
    {
      title: "Les avantages du numérique pour les élèves du collège et lycée"
    }
  ];

  const slides = [
    {
      title: "Accédez à nos classes virtuelles en direct, animées par des professeurs qualifiés. N'hésitez plus !",
      buttonText: "Commencez maintenant",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      title: "Maîtrisez de nouvelles compétences grâce à nos formations 100% à distance. Choisissez votre programme !",
      buttonText: "Découvrir",
      gradient: "from-green-400 to-blue-500"
    },
    {
      title: "L'école d'été",
      subtitle: "un programme parfait pour commencer l'année prochaine en force !",
      buttonText: "S'inscrire à l'école d'été",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#21B573] text-white px-4 py-2 text-sm overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-6 min-w-full">
          {/* Phones */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>05 23 41 93 46</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>06 07 77 06 07</span>
            </div>
          </div>

          {/* Roles + Language */}
          <div className="flex items-center gap-4">
            <span><strong>Étudiant</strong> Enseignant Entreprise</span>
            <TbWorld className="w-6 h-6 text-white flex-shrink-0" />
          </div>
        </div>
      </div>


      {/* Navigation */}
      <Navbar />

      {/*Slider Section*/}
      <div className="relative w-full h-96 overflow-hidden bg-gray-200">
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
            <div className={`w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-12 text-white relative overflow-hidden`}
              style={{
                backgroundImage: index === 0
                  ? 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)'
                  : index === 1
                    ? 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
                    : 'url(https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative z-10 max-w-2xl">
                {slide.title === "L'école d'été" ? (
                  <>
                    <h1 className="text-5xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 opacity-90 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </>
                ) : (
                  <h1 className="text-3xl font-bold mb-8 leading-relaxed">
                    {slide.title}
                  </h1>
                )}

                <button className="bg-[#21B573] hover:bg-green-600 text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Slider Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Les avantages de <span className='text-[#21B573]'>Go</span>MyClass
              </h1>
              <p className="text-xl mb-6 leading-relaxed">
                GoMyClass allie l’excellence pédagogique à la flexibilité du digital.
                Bénéficiez d’un enseignement en direct, structuré et accessible partout, conçu pour vous accompagner vers la réussite.
                Cours interactifs, explications claires, supports complets… tout est réuni pour vous faire progresser efficacement, à votre rythme.
                <br />
                <br />
                Rejoignez-nous dès maintenant pour transformer vos efforts en réussite.
              </p>
              <button className="bg-[#21B573] text-black px-16 py-3 ml-80 rounded-full hover:bg-green-500 transition-all font-bold">
                Rejoins GoMyClass
              </button>
            </div>

            {/* Right Placeholder */}
            <div className="h-96 rounded-2xl flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <img className='rounded-2xl h-[400px] w-[400px] object-cover' src={study} alt='GoMyclass' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Grid */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="py-16">
        {/* Right Content */}
        <div>
          <img src={mobileApp} alt='Mobile App' />
        </div>
      </div>

      {/* Formations Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Formations 100 % en ligne.
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            Formez-vous à distance
          </h3>
          <p className="text-black max-w-4xl mx-auto mb-12 leading-relaxed">
            Découvrez nos formations 100 % en ligne, conçues pour vous accompagner dans trois secteurs essentiels : génie civil, informatique et infographie. Que vous soyez étudiant, technicien ou professionnel, développez vos compétences pratiques grâce à des modules flexibles, adaptés à vos besoins et animés par des experts qualifiés. Apprenez à votre rythme, où que vous soyez, avec un suivi personnalisé.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formations.map((formation, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 text-left">
                <div className="bg-gray-200 h-48 rounded-xl mb-6 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{formation.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{formation.description}</p>
                <button className="flex flex-column gap-2 items-center bg-[#21B573] text-black px-8 py-3 rounded-full hover:bg-green-600 transition-all font-semibold">
                  {formation.buttonText} <FaArrowRightLong className='mt-1' />
                </button>
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
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 group">
              <span>voir plus</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Custom Grid Layout */}
          <div className="grid grid-cols-12 gap-6 h-[500px]">
            {/* Left Card */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="bg-gray-200 h-3/5 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
              </div>
              <div className="p-4 h-2/5 flex items-center">
                <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-green-600 transition-colors duration-300 text-sm">
                  {blogPosts[0].title}
                </h3>
              </div>
            </div>

            {/* Middle Column - Two Stacked Cards */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
              {/* Top Middle Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-1/2">
                <div className="bg-gray-200 h-3/5 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                  <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
                </div>
                <div className="p-4 h-2/5 flex items-center">
                  <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-green-600 transition-colors duration-300 text-sm">
                    {blogPosts[1].title}
                  </h3>
                </div>
              </div>

              {/* Bottom Middle Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-1/2">
                <div className="bg-gray-200 h-3/5 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                  <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
                </div>
                <div className="p-4 h-2/5 flex items-center">
                  <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-green-600 transition-colors duration-300 text-sm">
                    {blogPosts[2].title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="bg-gray-200 h-3/5 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
              </div>
              <div className="p-4 h-2/5 flex items-center">
                <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-green-600 transition-colors duration-300 text-sm">
                  {blogPosts[3].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - positioned overlapping the footer */}
      <div className="relative z-10 mb-6">
        <div className="bg-[#21B573] rounded-3xl py-6 px-6 w-full max-w-4xl mx-auto -mb-14 relative shadow-lg">
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
      <footer className="bg-black text-white py-20 px-4">
        <div className="w- mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <h3 className="text-3xl font-poppins font-bold mb-1 text-white"><span className='text-[#21B573]'>Go</span>MyClass</h3>
              <p className="text-sm text-gray-400 mb-6 ml-12">Navigate to Success</p>
              <div className="space-y-3 text-sm">
                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-fit hover:bg-[#1a9d63] transition-colors">
                  <MdLocalPhone className="w-4 h-4" /> 06 07 77 06 07
                </button>
                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-fit hover:bg-[#1a9d63] transition-colors">
                  <Phone className="w-4 h-4" /> 05 23 41 93 46
                </button>
                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-fit hover:bg-[#1a9d63] transition-colors">
                  <MdLocationOn className="w-4 h-4" /> Où nous trouver
                </button>
                <button className="flex items-center gap-2 bg-[#21B573] text-white px-4 py-2 rounded-full w-fit hover:bg-[#1a9d63] transition-colors">
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

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            © 2025 GoMyClass. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;