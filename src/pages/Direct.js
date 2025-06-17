import React, { useState } from 'react';
import { LuRadio } from "react-icons/lu";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Direct = () => {
    const [selectedTrack, setSelectedTrack] = useState('2e baccalauréat');

    const tracks = [
        '2e baccalauréat',
        '1re baccalauréat',
        'Tronc commun',
        'Collège'
    ];

    const scheduleData = {
        'PC & SVT': {
            subjects: 'Maths(4h) - Physique Chimie(4h) - Science de vie et de la terre(4h) - Français(3h) - Anglais(3h)',
            schedule: [
                { time: '8h-9h', lundi: 'Maths', mardi: 'SVT', mercredi: 'Maths', jeudi: 'SVT', vendredi: 'Maths', samedi: 'SVT' },
                { time: '9h-10h', lundi: 'Maths', mardi: 'SVT', mercredi: 'Maths', jeudi: 'SVT', vendredi: 'Maths', samedi: 'SVT' },
                { time: '10h-11h', lundi: 'SVT', mardi: 'Maths', jeudi: 'SVT', vendredi: 'Maths', samedi: 'SVT' },
                { time: '11h-12h', lundi: 'SVT', mardi: 'Maths', jeudi: 'SVT', vendredi: 'Maths', samedi: 'SVT' },
                { time: '14h-15h', lundi: 'Fr', mardi: 'Ang', mercredi: 'Fr', jeudi: 'Ang', vendredi: 'Fr', samedi: 'Ang' },
                { time: '15h-16h', lundi: 'Fr', mardi: 'Ang', mercredi: 'Fr', jeudi: 'Ang', vendredi: 'Fr', samedi: 'Ang' }
            ]
        },
        'SMA & SMB': {
            subjects: 'Maths(6h) - Physique Chimie(6h) - Science de vie et de la terre(2h) - SI(2h) - Français(3h) - Anglais(3h)',
            schedule: [
                { time: '8h-9h', lundi: 'Maths', mardi: 'PC', mercredi: 'Maths', jeudi: 'PC', vendredi: 'Maths', samedi: 'PC' },
                { time: '9h-10h', lundi: 'Maths', mardi: 'PC', mercredi: 'Maths', jeudi: 'PC', vendredi: 'Maths', samedi: 'PC' },
                { time: '10h-11h', lundi: 'PC', mardi: 'Maths', jeudi: 'PC', vendredi: 'Maths', samedi: 'PC' },
                { time: '11h-12h', lundi: 'PC', mardi: 'Maths', jeudi: 'PC', vendredi: 'Maths', samedi: 'PC' },
                { time: '14h-15h', lundi: 'Ang', mardi: 'Fr', mercredi: 'Ang', jeudi: 'Fr', vendredi: 'Ang', samedi: 'Fr' },
                { time: '15h-16h', lundi: 'Ang', mardi: 'Fr', mercredi: 'Ang', jeudi: 'Fr', vendredi: 'Ang', samedi: 'Fr' }
            ]
        },
        'STM & STE': {
            subjects: 'SI(4h) - Maths(4h) - Physique Chimie(4h) - Français(3h) - Anglais(3h)',
            schedule: [
                { time: '8h-9h', lundi: 'Maths', mardi: 'SI', mercredi: 'Maths', jeudi: 'SI', vendredi: 'Maths', samedi: 'SI' },
                { time: '9h-10h', lundi: 'Maths', mardi: 'SI', mercredi: 'Maths', jeudi: 'SI', vendredi: 'Maths', samedi: 'SI' },
                { time: '10h-11h', lundi: 'SI', mardi: 'Maths', jeudi: 'SI', vendredi: 'Maths', samedi: 'SI' },
                { time: '11h-12h', lundi: 'SI', mardi: 'Maths', jeudi: 'SI', vendredi: 'Maths', samedi: 'SI' },
                { time: '14h-15h', lundi: 'Ang', mardi: 'Fr', mercredi: 'Ang', jeudi: 'Fr', vendredi: 'Ang', samedi: 'Fr' },
                { time: '15h-16h', lundi: 'Ang', mardi: 'Fr', mercredi: 'Ang', jeudi: 'Fr', vendredi: 'Ang', samedi: 'Fr' }
            ]
        },
        'SE & SGC': {
            subjects: 'Economie & Gestion(6h) - Comptabilité(4h) - Maths(2h) - Français(3h) - Anglais(3h)',
            schedule: [
                { time: '8h-9h', lundi: 'Maths', mardi: 'Eco', mercredi: 'Maths', jeudi: 'Eco', vendredi: 'Maths', samedi: 'Eco' },
                { time: '9h-10h', lundi: 'Maths', mardi: 'Eco', mercredi: 'Maths', jeudi: 'Eco', vendredi: 'Maths', samedi: 'Eco' },
                { time: '10h-11h', lundi: 'Eco', mardi: 'Maths', jeudi: 'Eco', vendredi: 'Maths', samedi: 'Eco' },
                { time: '11h-12h', lundi: 'Eco', mardi: 'Maths', jeudi: 'Eco', vendredi: 'Maths', samedi: 'Eco' },
                { time: '14h-15h', lundi: 'Fr', mardi: 'Ang', mercredi: 'Fr', jeudi: 'Ang', vendredi: 'Fr', samedi: 'Ang' },
                { time: '15h-16h', lundi: 'Fr', mardi: 'Ang', mercredi: 'Fr', jeudi: 'Ang', vendredi: 'Fr', samedi: 'Ang' }
            ]
        }
    };

    const features = [
        {
            title: "Révisions ciblées  et remise à niveau",
            description: "Renforcez vos acquis et comblez vos lacunes avant la rentrée."
        },
        {
            title: "Prise d’avance sur le programme de l’année prochaine",
            description: "Découvrez les notions clés du niveau supérieur pour commencer l’année en confiance."
        },
        {
            title: "Cours en direct avec replays disponibles",
            description: "Suivez les séances animées par des enseignants qualifiés, en direct ou à votre rythme."
        },
        {
            title: "Chat et accompagnement personnalisé",
            description: "Suivi individuel, conseils méthodologiques et réponses à vos questions via la plateforme."
        },
        {
            title: "Exercices corrigés, quiz et devoirs encadrés",
            description: "Entraînez-vous régulièrement pour valider votre progression."
        },
        {
            title: "Flexibilité totale dans l’organisation",
            description: "Apprenez à votre rythme, selon votre emploi du temps."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Header */}
            <div className="bg-gradient-to-r from-[#21B573] to-[#1a9660] text-black p-6">
                <div className="md:ml-6 mx-auto">
                    <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                        Classe En direct
                        <LuRadio className='w-8 h-8 mt-2' />
                    </h1>
                    <p className="text-lg leading-relaxed max-w-4xl">
                        Suivez vos cours en direct avec des enseignants qualifiés. Rejoignez vos classes
                        en un clic, posez vos questions en temps réel, accédez aux replays et progressez
                        à votre rythme grâce à un encadrement pédagogique personnalisé.
                    </p>
                </div>
            </div>

            <div className="mx-auto p-6 md:p-12">
                {/* Track Selection */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {tracks.map((track) => (
                        <button
                            key={track}
                            onClick={() => setSelectedTrack(track)}
                            className={`px-6 py-2 rounded-full transition-colors ${selectedTrack === track
                                ? 'bg-[#21B573] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {track}
                        </button>
                    ))}
                </div>

                {/* Course Sections */}
                {Object.entries(scheduleData).map(([courseName, data]) => (
                    <div key={courseName} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            2ᵉ année Bac sciences {courseName.toLowerCase()}: {courseName}
                        </h2>
                        <div className="mb-4">
                            <p className="font-semibold text-gray-700 mb-2">Matières disponibles :</p>
                            <p className="text-gray-600">{data.subjects}</p>
                        </div>

                        {/* Schedule Table */}
                        <div className="overflow-x-auto bg-white">
                            <table className="w-full text-sm text-gray-800 font-ibm">
                                <thead>
                                    {/* First row: Days with colspan */}
                                    <tr className="bg-[#54C694] text-black text-center">
                                        <th rowSpan="2" className="p-3 bg-white"></th>
                                        <th colSpan="2" className="p-3">Lundi</th>
                                        <th colSpan="2" className="p-3">Mardi</th>
                                        <th colSpan="2" className="p-3">Mercredi</th>
                                        <th colSpan="2" className="p-3">Jeudi</th>
                                        <th colSpan="2" className="p-3">Vendredi</th>
                                        <th colSpan="2" className="p-3">Samedi</th>
                                    </tr>
                                    {/* Second row: Group headers */}
                                    <tr className="text-black text-center">
                                        {Array.from({ length: 12 }).map((_, idx) => {
                                            const bgColor = Math.floor(idx / 2) % 2 === 0 ? '#C9C9C9' : '#E0E0E0';
                                            const isLast = idx === 11;
                                            return (
                                                <th
                                                    key={idx}
                                                    className={`p-2 ${!isLast ? 'border-r' : ''}`}
                                                    style={{ backgroundColor: bgColor }}
                                                >
                                                    {`Gr ${((idx % 4) + 1)}`}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example rows — repeat this for each session */}
                                    {[
                                        { time: "1ère séance (2h)", data: ["Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT"] },
                                        { time: "2ᵉ séance (2h)", data: ["SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths", "SVT", "Maths"] },
                                        { time: "3ᵉ séance (1h)", data: ["Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr"] },
                                        { time: "4ᵉ séance (1h)", data: ["Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang", "Fr", "Ang"] },
                                    ].map((row, i) => (
                                        <tr key={i} className='font-semibold'>
                                            <td className="text-center p-3 md:p-0 text-black bg-[#54C694]">{row.time}</td>
                                            {row.data.map((val, idx) => {
                                                const bgColor = Math.floor(idx / 2) % 2 === 0 ? '#C9C9C9' : '#E0E0E0';
                                                return (
                                                    <td
                                                        key={idx}
                                                        className={`p-3 text-center ${idx !== row.data.length - 1 ? 'border-r' : ''}`}
                                                        style={{ backgroundColor: bgColor }}
                                                    >
                                                        {val}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {/* Planning Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Planning pédagogique 2025-2026</h2>

                    <div className="space-y-6 ml-12">
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.50235 33.6314L0.871353 40.7814L1.36415 43.12L3.69615 42.6206L8.32495 35.475C7.32988 34.9478 6.38508 34.3307 5.50235 33.6314ZM25.1088 31.1344C25.1396 31.0706 25.1594 31.0002 25.188 30.932C25.3053 30.6768 25.4065 30.415 25.4916 30.1466C25.5018 30.0967 25.5136 30.0498 25.5268 30.0058C25.6111 29.7097 25.6831 29.4103 25.7424 29.1082V29.062C26.1714 26.4902 25.4234 23.6214 23.7118 21.0298L26.1538 17.259C28.9676 17.6176 31.4008 16.9092 32.5712 15.0986C34.6018 11.968 32.1312 6.7562 27.0602 3.454C21.9848 0.149601 16.2296 0.0110012 14.2034 3.1372C13.0286 4.95 13.3718 7.4646 14.848 9.8978L12.4016 13.6686C9.34575 13.156 6.42635 13.6334 4.25495 15.0766C4.24029 15.0795 4.22782 15.0854 4.21755 15.0942C3.96451 15.2676 3.72071 15.4541 3.48715 15.653C3.44975 15.6838 3.40575 15.7124 3.37495 15.7432C3.16365 15.9297 2.9645 16.1296 2.77875 16.3416C2.73475 16.3944 2.67315 16.4406 2.63135 16.4956C2.39631 16.7604 2.18296 17.0436 1.99335 17.3426C-1.05145 22.0352 1.54675 29.1368 7.78595 33.2024C14.0296 37.268 21.558 36.7532 24.5962 32.0606C24.7898 31.7629 24.9606 31.4541 25.1088 31.1344ZM23.3158 9.2268C21.3644 7.9574 20.4118 5.9554 21.1928 4.7476C21.9716 3.5442 24.187 3.5992 26.134 4.8686C28.0898 6.138 29.0336 8.1444 28.257 9.3478C27.4804 10.5512 25.2694 10.4962 23.3158 9.2268Z" fill="#21B573" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Semestre 1 : du 1er septembre au 31 décembre 2025 :</h3>
                                <div className="text-gray-600 space-y-1">
                                    <p>Cours + exercices + quiz + examens des années précédentes +</p>
                                    <p>évaluations mensuelles</p>
                                    <p>→ 1 examen blanc en fin de semestre</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.50235 33.6314L0.871353 40.7814L1.36415 43.12L3.69615 42.6206L8.32495 35.475C7.32988 34.9478 6.38508 34.3307 5.50235 33.6314ZM25.1088 31.1344C25.1396 31.0706 25.1594 31.0002 25.188 30.932C25.3053 30.6768 25.4065 30.415 25.4916 30.1466C25.5018 30.0967 25.5136 30.0498 25.5268 30.0058C25.6111 29.7097 25.6831 29.4103 25.7424 29.1082V29.062C26.1714 26.4902 25.4234 23.6214 23.7118 21.0298L26.1538 17.259C28.9676 17.6176 31.4008 16.9092 32.5712 15.0986C34.6018 11.968 32.1312 6.7562 27.0602 3.454C21.9848 0.149601 16.2296 0.0110012 14.2034 3.1372C13.0286 4.95 13.3718 7.4646 14.848 9.8978L12.4016 13.6686C9.34575 13.156 6.42635 13.6334 4.25495 15.0766C4.24029 15.0795 4.22782 15.0854 4.21755 15.0942C3.96451 15.2676 3.72071 15.4541 3.48715 15.653C3.44975 15.6838 3.40575 15.7124 3.37495 15.7432C3.16365 15.9297 2.9645 16.1296 2.77875 16.3416C2.73475 16.3944 2.67315 16.4406 2.63135 16.4956C2.39631 16.7604 2.18296 17.0436 1.99335 17.3426C-1.05145 22.0352 1.54675 29.1368 7.78595 33.2024C14.0296 37.268 21.558 36.7532 24.5962 32.0606C24.7898 31.7629 24.9606 31.4541 25.1088 31.1344ZM23.3158 9.2268C21.3644 7.9574 20.4118 5.9554 21.1928 4.7476C21.9716 3.5442 24.187 3.5992 26.134 4.8686C28.0898 6.138 29.0336 8.1444 28.257 9.3478C27.4804 10.5512 25.2694 10.4962 23.3158 9.2268Z" fill="#21B573" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Semestre 2 : du 1er janvier au 30 avril 2026 :</h3>
                                <div className="text-gray-600 space-y-1">
                                    <p>Cours + exercices + quiz + examens des années précédentes +</p>
                                    <p>évaluations mensuelles</p>
                                    <p>→ 2 examens blancs en fin de semestre</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.50235 33.6314L0.871353 40.7814L1.36415 43.12L3.69615 42.6206L8.32495 35.475C7.32988 34.9478 6.38508 34.3307 5.50235 33.6314ZM25.1088 31.1344C25.1396 31.0706 25.1594 31.0002 25.188 30.932C25.3053 30.6768 25.4065 30.415 25.4916 30.1466C25.5018 30.0967 25.5136 30.0498 25.5268 30.0058C25.6111 29.7097 25.6831 29.4103 25.7424 29.1082V29.062C26.1714 26.4902 25.4234 23.6214 23.7118 21.0298L26.1538 17.259C28.9676 17.6176 31.4008 16.9092 32.5712 15.0986C34.6018 11.968 32.1312 6.7562 27.0602 3.454C21.9848 0.149601 16.2296 0.0110012 14.2034 3.1372C13.0286 4.95 13.3718 7.4646 14.848 9.8978L12.4016 13.6686C9.34575 13.156 6.42635 13.6334 4.25495 15.0766C4.24029 15.0795 4.22782 15.0854 4.21755 15.0942C3.96451 15.2676 3.72071 15.4541 3.48715 15.653C3.44975 15.6838 3.40575 15.7124 3.37495 15.7432C3.16365 15.9297 2.9645 16.1296 2.77875 16.3416C2.73475 16.3944 2.67315 16.4406 2.63135 16.4956C2.39631 16.7604 2.18296 17.0436 1.99335 17.3426C-1.05145 22.0352 1.54675 29.1368 7.78595 33.2024C14.0296 37.268 21.558 36.7532 24.5962 32.0606C24.7898 31.7629 24.9606 31.4541 25.1088 31.1344ZM23.3158 9.2268C21.3644 7.9574 20.4118 5.9554 21.1928 4.7476C21.9716 3.5442 24.187 3.5992 26.134 4.8686C28.0898 6.138 29.0336 8.1444 28.257 9.3478C27.4804 10.5512 25.2694 10.4962 23.3158 9.2268Z" fill="#21B573" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">À partir du 1 mai 2026 :</h3>
                                <div className="text-gray-600 space-y-1">
                                    <p>• Préparation intensive à l'examen régional et national</p>
                                    <p>• Préparation aux concours post-bac (pour les bacheliers)</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.50235 33.6314L0.871353 40.7814L1.36415 43.12L3.69615 42.6206L8.32495 35.475C7.32988 34.9478 6.38508 34.3307 5.50235 33.6314ZM25.1088 31.1344C25.1396 31.0706 25.1594 31.0002 25.188 30.932C25.3053 30.6768 25.4065 30.415 25.4916 30.1466C25.5018 30.0967 25.5136 30.0498 25.5268 30.0058C25.6111 29.7097 25.6831 29.4103 25.7424 29.1082V29.062C26.1714 26.4902 25.4234 23.6214 23.7118 21.0298L26.1538 17.259C28.9676 17.6176 31.4008 16.9092 32.5712 15.0986C34.6018 11.968 32.1312 6.7562 27.0602 3.454C21.9848 0.149601 16.2296 0.0110012 14.2034 3.1372C13.0286 4.95 13.3718 7.4646 14.848 9.8978L12.4016 13.6686C9.34575 13.156 6.42635 13.6334 4.25495 15.0766C4.24029 15.0795 4.22782 15.0854 4.21755 15.0942C3.96451 15.2676 3.72071 15.4541 3.48715 15.653C3.44975 15.6838 3.40575 15.7124 3.37495 15.7432C3.16365 15.9297 2.9645 16.1296 2.77875 16.3416C2.73475 16.3944 2.67315 16.4406 2.63135 16.4956C2.39631 16.7604 2.18296 17.0436 1.99335 17.3426C-1.05145 22.0352 1.54675 29.1368 7.78595 33.2024C14.0296 37.268 21.558 36.7532 24.5962 32.0606C24.7898 31.7629 24.9606 31.4541 25.1088 31.1344ZM23.3158 9.2268C21.3644 7.9574 20.4118 5.9554 21.1928 4.7476C21.9716 3.5442 24.187 3.5992 26.134 4.8686C28.0898 6.138 29.0336 8.1444 28.257 9.3478C27.4804 10.5512 25.2694 10.4962 23.3158 9.2268Z" fill="#21B573" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">l'École d'Été : du 1er juillet au 31 août 2026</h3>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button className="bg-[#21B573] text-black px-12 py-3 rounded-full font-semibold hover:bg-[#1a9660] transition-colors">
                            S'inscrire →
                        </button>
                    </div>
                </div>

                {/* Summer School Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Rejoignez l'École d'Été en Ligne <span className='text-[#21B573]'>Go</span>MyClass !
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`font-ibm p-4 transition-shadow
        ${index % 3 !== 2 ? 'border-r border-gray-300' : ''}
      `}
                            >
                                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-[#21B573] text-semibold text-2xl mb-8">
                            Ne laissez pas filer l’été… avancez vers la réussite dès maintenant !
                        </p>
                        <button className="bg-[#21B573] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#1a9660] transition-colors">
                            Rejoindre l'École d'Été
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Direct;