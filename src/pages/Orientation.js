import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Printer, Mail, Globe } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Orientation = () => {
    const [selectedCategories, setSelectedCategories] = useState(['FMP & FMD']);
    const [visibleCount, setVisibleCount] = useState(4);

    const schools = [
        {
            id: 1,
            name: 'École nationale supérieure d\'arts et métiers de Meknès',
            category: 'ENSAM',
            address: 'Marjane 2 B.P 15290 Al-Mansour, Meknès',
            phone: '+212 5 35 46 71 60/62',
            fax: '+212 5 35 46 71 63',
            email: 'contact@ensam.um.ac.ma',
            website: 'http://www.ensam.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop'
        },
        {
            id: 2,
            name: 'École nationale supérieure d\'arts et métiers de Meknès',
            category: 'ENSAM',
            address: 'Marjane 2 B.P 15290 Al-Mansour, Meknès',
            phone: '+212 5 35 46 71 60/62',
            fax: '+212 5 35 46 71 63',
            email: 'contact@ensam.um.ac.ma',
            website: 'http://www.ensam.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=200&fit=crop'
        },
        {
            id: 3,
            name: 'École nationale supérieure d\'arts et métiers de Meknès',
            category: 'ENSAM',
            address: 'Marjane 2 B.P 15290 Al-Mansour, Meknès',
            phone: '+212 5 35 46 71 60/62',
            fax: '+212 5 35 46 71 63',
            email: 'contact@ensam.um.ac.ma',
            website: 'http://www.ensam.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop'
        },
        {
            id: 4,
            name: 'École nationale supérieure d\'arts et métiers de Meknès',
            category: 'ENSAM',
            address: 'Marjane 2 B.P 15290 Al-Mansour, Meknès',
            phone: '+212 5 35 46 71 60/62',
            fax: '+212 5 35 46 71 63',
            email: 'contact@ensam.um.ac.ma',
            website: 'http://www.ensam.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=200&fit=crop'
        },
        {
            id: 5,
            name: 'Faculté de Médecine et de Pharmacie',
            category: 'FMP & FMD',
            address: 'Avenue Mohammed V, Rabat',
            phone: '+212 5 37 77 38 60',
            fax: '+212 5 37 77 38 61',
            email: 'contact@fmp.um.ac.ma',
            website: 'http://www.fmp.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop'
        },
        {
            id: 6,
            name: 'Faculté des Sciences et Techniques',
            category: 'FST',
            address: 'Route d\'Imouzzer, Fès',
            phone: '+212 5 35 60 80 14',
            fax: '+212 5 35 60 82 14',
            email: 'contact@fst.um.ac.ma',
            website: 'http://www.fst.um.ac.ma',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
        }
    ];

    const categories = ['FMP & FMD', 'FST', 'EST', 'ENSA', 'ENA', 'ENSAM', 'ENCG', 'ISCAE', 'Autres'];

    const handleCategoryChange = (category) => {
        setSelectedCategories([category]);
        setVisibleCount(4);
    };

    const filteredSchools = useMemo(() => {
        if (selectedCategories.includes('Toutes')) {
            return schools;
        }
        return schools.filter(school =>
            selectedCategories.includes(school.category)
        );
    }, [selectedCategories]);

    const visibleSchools = filteredSchools.slice(0, visibleCount);
    const hasMoreSchools = filteredSchools.length > visibleCount;

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, filteredSchools.length));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Header */}
            <div style={{ backgroundColor: '#21B573' }} className="text-white py-6 md:py-8 px-4 mb-6">
                <div className="md:ml-6 mx-auto">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-black">
                        GoMyClass, votre passerelle vers toutes les écoles,<br /> les instituts et les facultés du Maroc
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg opacity-90 text-black">
                        Notre mission est de mettre l'orientation au service de votre réussite. Pour toute question ou accompagnement personnalisé, n'hésitez pas à nous contacter.
                    </p>
                </div>
            </div>

            <div className="mx-auto px-4 py-4 md:py-6">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                        <div className="bg-[#D9D9D9] p-4 md:p-6 rounded-lg shadow-sm">
                            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Choisissez une catégorie</h3>
                            <div className="space-y-2 md:space-y-3">
                                {categories.map(category => (
                                    <label key={category} className="flex items-center text-sm md:text-base cursor-pointer hover:bg-gray-200 p-1 md:p-2 rounded transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="mr-2 md:mr-3 w-3 h-3 md:w-4 md:h-4 accent-green-500"
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                            {visibleSchools.map(school => (
                                <div key={school.id} className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                                    {/* School Image */}
                                    <div className="h-32 md:h-40 overflow-hidden bg-gray-200">
                                        <img
                                            src={school.image}
                                            alt={school.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* School Content */}
                                    <div className="p-4 md:p-5">
                                        <h3 className="font-bold text-base md:text-lg mb-4 text-black leading-tight">
                                            {school.name}
                                        </h3>

                                        {/* Contact Information */}
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-start">
                                                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-black" />
                                                <span className="text-black">{school.address}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-black" />
                                                <span className="text-black">{school.phone}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Printer className="w-4 h-4 mr-2 flex-shrink-0 text-black" />
                                                <span className="text-black">{school.fax}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-black" />
                                                <span className="text-black hover:underline cursor-pointer">{school.email}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Globe className="w-4 h-4 mr-2 flex-shrink-0 text-black" />
                                                <a href={school.website} target='blanc' className="text-blue-600 hover:underline cursor-pointer">{school.website}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show More Button */}
                        {hasMoreSchools && (
                            <div className="flex justify-center mb-8">
                                <button
                                    onClick={handleShowMore}
                                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                                >
                                    Afficher plus
                                </button>
                            </div>
                        )}

                        {/* No Results */}
                        {filteredSchools.length === 0 && (
                            <div className="text-center py-8 md:py-12">
                                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">Aucune école trouvée</h3>
                                <p className="text-sm md:text-base text-gray-600">Essayez de modifier vos critères de sélection</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orientation;