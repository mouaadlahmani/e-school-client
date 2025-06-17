
import React, { useState } from 'react';
import { Clock, Users, Globe, Calendar, Tag, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
const Programme = ({ formationId, onBack }) => {
    const [openModules, setOpenModules] = useState({});
    const navigate = useNavigate();
    
    const toggleModule = (moduleId) => {
        setOpenModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    // All formations data
    const formations = {
        1: {
            id: 1,
            name: 'Autodesk Civil 3D',
            category: 'Génie civil',
            duration: '5 jours',
            volumeHoraire: '48h',
            participants: 48,
            language: 'Français',
            rhythm: '~3h45 / Semaine',
            sessions: '10/03 & 07/09',
            nextSession: 'Prochaine - 23&24 Septembre',
            date: 'Déb : 2020 MAI',
            price: '2000 MAD',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
        },
        2: {
            id: 2,
            name: 'AutoCAD (Pour Le Génie Civil)',
            category: 'Informatique',
            duration: '4 jours',
            volumeHoraire: '48h',
            participants: 52,
            language: 'Français',
            rhythm: '~3h / Semaine',
            sessions: '15/04 & 12/10',
            nextSession: 'Prochaine - 23&24 Septembre',
            date: 'Déb : 2020 MAI',
            price: '1800 MAD',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        3: {
            id: 3,
            name: 'Autodesk Revit',
            category: 'Informatique',
            duration: '6 jours',
            volumeHoraire: '48h',
            participants: 35,
            language: 'Français',
            rhythm: '~3h30 / Semaine',
            sessions: '20/05 & 18/11',
            nextSession: 'Prochaine - 23&24 Septembre',
            date: 'Déb : 2020 MAI',
            price: '2200 MAD',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
        }
    };

    // Program data for each formation
    const programData = {
        1: { // Autodesk Civil 3D
            title: "Formation Autodesk Civil 3D",
            description: "Maîtrisez Autodesk Civil 3D grâce à une formation en ligne pratique et progressive. Apprenez à modéliser des terrains, concevoir des profils en long et en travers, et produire des plans conformes aux standards du génie civil. Formation idéale pour les ingénieurs, techniciens et étudiants en infrastructures linéaires.",
            modules: [
                {
                    id: 1,
                    title: "Introduction À Autodesk Civil 3D",
                    items: [
                        "Découverte de l'interface utilisateur Civil 3D",
                        "Configuration de l'environnement de travail",
                        "Compréhension des objets Civil 3D et de leur hiérarchie",
                        "Gestion des styles et des paramètres"
                    ]
                },
                {
                    id: 2,
                    title: "Modélisation Du Terrain",
                    items: [
                        "Apprendre À Importer Et À Créer Des Surfaces À Partir De Données Topographiques (Points, Courbes De Niveau, Etc.).",
                        "Savoir Analyser La Pente Du Terrain, Effectuer Des Calculs De Volumes De Terrassement Et Modéliser Le Relief."
                    ],
                    objective: "Acquérir Les Compétences Nécessaires Pour Créer, Analyser Et Modifier Des Surfaces Topographiques."
                },
                {
                    id: 3,
                    title: "Conception De Routes",
                    items: [
                        "Création d'alignements horizontaux",
                        "Définition des profils en long",
                        "Conception des profils en travers types",
                        "Génération automatique de corridors routiers"
                    ]
                },
                {
                    id: 4,
                    title: "Modélisation Des Infrastructures",
                    items: [
                        "Apprendre À Importer Et À Créer Des Surfaces À Partir De Données Topographiques (Points, Courbes De Niveau, Etc.).",
                        "Savoir Analyser La Pente Du Terrain, Effectuer Des Calculs De Volumes De Terrassement Et Modéliser Le Relief."
                    ],
                    objective: "Acquérir Les Compétences Nécessaires Pour Créer, Analyser Et Modifier Des Surfaces Topographiques."
                }
            ]
        },
        2: { // AutoCAD (Pour Le Génie Civil)
            title: "Formation AutoCAD (Pour Le Génie Civil)",
            description: "Formation complète pour maîtriser AutoCAD dans le contexte du génie civil. Apprenez les techniques de dessin technique, la création de plans d'architecture et d'ingénierie.",
            modules: [
                {
                    id: 1,
                    title: "Interface et Outils de Base",
                    items: [
                        "Découverte de l'interface AutoCAD",
                        "Maîtrise des outils de dessin fondamentaux",
                        "Gestion des calques et propriétés d'objets",
                        "Système de coordonnées et unités"
                    ]
                },
                {
                    id: 2,
                    title: "Dessin Technique Avancé",
                    items: [
                        "Création de plans techniques précis",
                        "Utilisation des outils de mesure et de cotation",
                        "Gestion des blocs et bibliothèques",
                        "Techniques de mise en page et impression"
                    ]
                },
                {
                    id: 3,
                    title: "Applications Génie Civil",
                    items: [
                        "Dessin de plans de fondations",
                        "Création de plans de coffrage",
                        "Représentation des armatures",
                        "Standards et normes du génie civil"
                    ]
                }
            ]
        },
        3: { // Autodesk Revit
            title: "Formation Autodesk Revit",
            description: "Maîtrisez la modélisation BIM avec Autodesk Revit. Formation complète pour créer des modèles 3D paramétriques et générer automatiquement plans, coupes et élévations.",
            modules: [
                {
                    id: 1,
                    title: "Introduction au BIM et Revit",
                    items: [
                        "Concepts fondamentaux du BIM",
                        "Interface et navigation dans Revit",
                        "Gestion des familles et types",
                        "Organisation des vues et feuilles"
                    ]
                },
                {
                    id: 2,
                    title: "Modélisation Architecturale",
                    items: [
                        "Création des murs, sols et toitures",
                        "Insertion des portes et fenêtres",
                        "Modélisation des escaliers",
                        "Gestion des niveaux et grilles"
                    ]
                },
                {
                    id: 3,
                    title: "Documentation et Rendu",
                    items: [
                        "Génération automatique des plans",
                        "Création de coupes et élévations",
                        "Nomenclatures et métrés automatiques",
                        "Rendu photoréaliste et visualisation"
                    ]
                }
            ]
        }
    };

    const formation = formations[formationId];
    const currentProgram = programData[formationId] || {
        title: formation?.name || "Formation",
        description: "Programme détaillé bientôt disponible.",
        modules: []
    };

    if (!formation) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Formation non trouvée</h2>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 bg-[#21B573] text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux formations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Header with back button */}
            <div style={{ backgroundColor: '#21B573' }} className="text-white py-6 md:py-8 px-4 mb-6">
                <div className="md:ml-6 mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black">
                        {currentProgram.title}
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg opacity-90 text-black">
                        {currentProgram.description}
                    </p>
                </div>
            </div>

            <div className="mx-auto px-4 py-6 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Program Details */}
                    <div className="lg:col-span-2">
                        {/* Course Title */}
                        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{formation.name}</h2>

                            {/* Course Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Durée : {formation.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Volume : {formation.volumeHoraire}</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Langue : {formation.language}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Rythme : {formation.rhythm}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Sessions : {formation.sessions}</span>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="w-4 h-4 mr-2 text-gray-600" />
                                    <span>Tarif : {formation.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Program Modules */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Programme :</h3>

                            <div className="space-y-4">
                                {currentProgram.modules.map((module) => (
                                    <div key={module.id} className="border border-blue-200 rounded-lg">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors rounded-lg"
                                        >
                                            <div className="flex items-center">
                                                <span className="bg-[#21B573] text-white px-3 py-1 rounded text-sm font-medium mr-3">
                                                    Module {module.id}
                                                </span>
                                                <span className="font-medium text-gray-900">{module.title}</span>
                                            </div>
                                            {openModules[module.id] ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>

                                        {openModules[module.id] && (
                                            <div className="px-4 pb-4 border-t border-blue-100">
                                                {module.items && module.items.length > 0 && (
                                                    <ul className="space-y-3 mt-4">
                                                        {module.items.map((item, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <span className="w-2 h-2 bg-[#21B573] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {module.objective && (
                                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                        <span className="font-medium text-sm text-blue-800">Objectif : </span>
                                                        <span className="text-sm text-blue-700">{module.objective}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Course Image and Registration */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Course Image */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={formation.image}
                                    alt={formation.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#21B573] mb-2">
                                            {formation.price}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {formation.nextSession}
                                        </p>
                                        <button
                                            className="w-full px-6 py-3 bg-[#21B573] hover:opacity-90 text-white font-medium rounded-full transition-opacity"
                                            onClick={() => navigate("/inscrire")}
                                        >
                                            S'inscrire à cette formation
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-4">Informations complémentaires</h4>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">Catégorie :</span>
                                        <span className="ml-2 text-gray-600">{formation.category}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Participants :</span>
                                        <span className="ml-2 text-gray-600">{formation.participants} inscrits</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Début :</span>
                                        <span className="ml-2 text-gray-600">{formation.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Programme