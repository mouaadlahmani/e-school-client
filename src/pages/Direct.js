import React, { useState, useEffect } from 'react';
import { LuRadio } from "react-icons/lu";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Direct = () => {
    const [selectedTrack, setSelectedTrack] = useState('2ᵉ baccalauréat');
    const [scheduleData, setScheduleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [planning, setPlanning] = useState(null);

    const tracks = [
        '2ᵉ baccalauréat',
        '1ʳᵉ baccalauréat',
        'Tronc commun',
        'Collège'
    ];

    const trackFileMap = {
        '2ᵉ baccalauréat': '2bac.json',
        '1ʳᵉ baccalauréat': '1bac.json',
        'Tronc commun': 'tronc.json',
        'Collège': 'college.json'
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/data/${trackFileMap[selectedTrack]}`);
                const json = await res.json();
                const { planning, ...rest } = json;
                setScheduleData(rest);
                setPlanning(planning);
            } catch (err) {
                console.error("Erreur lors du chargement du fichier JSON :", err);
                setScheduleData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTrack]);

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
                <div className="flex justify-center font-semibold text-2xl flex-wrap gap-8 mb-16">
                    {tracks?.map((track) => (
                        <button
                            key={track}
                            onClick={() => setSelectedTrack(track)}
                            className={`px-16 py-4 rounded-full transition-colors ${selectedTrack === track
                                ? 'bg-[#21B573] text-black'
                                : 'bg-[#D9D9D9] text-black hover:bg-gray-300'
                                }`}
                        >
                            {track}
                        </button>
                    ))}
                </div>

                {/* Course Sections */}
                {scheduleData && Object.entries(scheduleData)?.map(([courseName, data]) => (
                    <div key={courseName} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {courseName}
                        </h2>
                        <div className="mb-4">
                            <p className="font-semibold text-gray-700 mb-2">Matières disponibles :</p>
                            <p className="text-gray-600">{data.subjects}</p>
                        </div>

                        {/* Schedule Table */}
                        <div className="overflow-x-auto bg-white">
                            <table className="w-full text-sm text-gray-800 font-ibm">
                                <thead>
                                    {/* First row: Days with dynamic colSpan */}
                                    <tr className="bg-[#54C694] text-black text-center">
                                        <th rowSpan="2" className="p-3 bg-white"></th>
                                        {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']?.map((day, idx) => {
                                            // Get all groups used in that day from all schedule rows
                                            const allGroups = new Set();
                                            data.schedule?.forEach(session => {
                                                const dayData = session[day] || {};
                                                Object.keys(dayData)?.forEach(g => allGroups.add(g));
                                            });
                                            const colSpan = allGroups.size || 1;
                                            return (
                                                <th key={day} colSpan={colSpan} className="p-3">
                                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                                </th>
                                            );
                                        })}
                                    </tr>

                                    {/* Second row: Group headers (if more than one group total) */}
                                    <tr className="text-black text-center">
                                        {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'].flatMap((day, idx) => {
                                            const allGroups = new Set();
                                            data.schedule?.forEach(session => {
                                                const dayData = session[day] || {};
                                                Object.keys(dayData)?.forEach(g => allGroups.add(g));
                                            });
                                            const sortedGroups = Array.from(allGroups).sort();
                                            return sortedGroups?.map((group, i) => {
                                                const bgColor = idx % 2 === 0 ? '#C9C9C9' : '#E0E0E0';
                                                return (
                                                    <th
                                                        key={`${day}-${group}`}
                                                        className={`p-2 ${i !== sortedGroups.length - 1 ? 'border-r' : ''}`}
                                                        style={{ backgroundColor: bgColor }}
                                                    >
                                                        {group}
                                                    </th>
                                                );
                                            });
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.schedule?.map((row, i) => {
                                        const rowTimeLabel = row.time;

                                        const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
                                        const cellData = [];

                                        days?.forEach((day, dayIdx) => {
                                            // Collect all groups for this day across all sessions
                                            const allGroups = new Set();
                                            data.schedule?.forEach(session => {
                                                const dayData = session[day] || {};
                                                Object.keys(dayData)?.forEach(g => allGroups.add(g));
                                            });

                                            const sortedGroups = Array.from(allGroups).sort();

                                            sortedGroups?.forEach(group => {
                                                const val = row[day]?.[group] || "--";
                                                cellData.push({ value: val, dayIndex: dayIdx });
                                            });
                                        });

                                        return (
                                            <tr key={i} className="font-semibold">
                                                <td className="text-center p-3 text-black bg-[#54C694]">{rowTimeLabel}</td>
                                                {cellData?.map((cell, idx) => {
                                                    const bgColor = cell.dayIndex % 2 === 0 ? '#C9C9C9' : '#E0E0E0';
                                                    return (
                                                        <td
                                                            key={idx}
                                                            className={`p-3 text-center ${idx !== cellData.length - 1 ? 'border-r' : ''}`}
                                                            style={{ backgroundColor: bgColor }}
                                                        >
                                                            {cell.value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {/* Planning Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Planning pédagogique 2025-2026</h2>

                    <div className="space-y-6 ml-12">
                        {planning?.map((item, idx) => (
                            <div className="flex items-start gap-4" key={idx}>
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.50235 33.6314L0.871353 40.7814L1.36415 43.12L3.69615 42.6206L8.32495 35.475C7.32988 34.9478 6.38508 34.3307 5.50235 33.6314ZM25.1088 31.1344C25.1396 31.0706 25.1594 31.0002 25.188 30.932C25.3053 30.6768 25.4065 30.415 25.4916 30.1466C25.5018 30.0967 25.5136 30.0498 25.5268 30.0058C25.6111 29.7097 25.6831 29.4103 25.7424 29.1082V29.062C26.1714 26.4902 25.4234 23.6214 23.7118 21.0298L26.1538 17.259C28.9676 17.6176 31.4008 16.9092 32.5712 15.0986C34.6018 11.968 32.1312 6.7562 27.0602 3.454C21.9848 0.149601 16.2296 0.0110012 14.2034 3.1372C13.0286 4.95 13.3718 7.4646 14.848 9.8978L12.4016 13.6686C9.34575 13.156 6.42635 13.6334 4.25495 15.0766C4.24029 15.0795 4.22782 15.0854 4.21755 15.0942C3.96451 15.2676 3.72071 15.4541 3.48715 15.653C3.44975 15.6838 3.40575 15.7124 3.37495 15.7432C3.16365 15.9297 2.9645 16.1296 2.77875 16.3416C2.73475 16.3944 2.67315 16.4406 2.63135 16.4956C2.39631 16.7604 2.18296 17.0436 1.99335 17.3426C-1.05145 22.0352 1.54675 29.1368 7.78595 33.2024C14.0296 37.268 21.558 36.7532 24.5962 32.0606C24.7898 31.7629 24.9606 31.4541 25.1088 31.1344ZM23.3158 9.2268C21.3644 7.9574 20.4118 5.9554 21.1928 4.7476C21.9716 3.5442 24.187 3.5992 26.134 4.8686C28.0898 6.138 29.0336 8.1444 28.257 9.3478C27.4804 10.5512 25.2694 10.4962 23.3158 9.2268Z" fill="#21B573" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <div className="text-gray-600 space-y-1">
                                        {item.points.length > 0 ? (
                                            item.points?.map((point, i) => <p key={i}>{point}</p>)
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        {features?.map((feature, index) => (
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