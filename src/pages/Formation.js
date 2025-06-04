import React, { useState, useMemo } from 'react';
import { Clock, Users, Globe, Calendar, Tag, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Formation = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Toutes']);
  const [visibleCount, setVisibleCount] = useState(4);

  const formations = [
    {
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
    {
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
    {
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
    },
    {
      id: 4,
      name: 'AutoCAD Civil 3D',
      category: 'Génie civil',
      duration: '5 jours',
      volumeHoraire: '48h',
      participants: 41,
      language: 'Français',
      rhythm: '~3h45 / Semaine',
      sessions: '08/06 & 25/12',
      nextSession: 'Prochaine - 23&24 Septembre',
      date: 'Déb : 2020 MAI',
      price: '2000 MAD',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c7c8de9aa?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Covadis',
      category: 'Topographie',
      duration: '4 jours',
      volumeHoraire: '48h',
      participants: 28,
      language: 'Français',
      rhythm: '~3h / Semaine',
      sessions: '12/07 & 30/01',
      nextSession: 'Prochaine - 23&24 Septembre',
      date: 'Déb : 2020 MAI',
      price: '1600 MAD',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'EPANET',
      category: 'Génie civil',
      duration: '3 jours',
      volumeHoraire: '48h',
      participants: 22,
      language: 'Français',
      rhythm: '~2h30 / Semaine',
      sessions: '18/08 & 15/02',
      nextSession: 'Prochaine - 23&24 Septembre',
      date: 'Déb : 2020 MAI',
      price: '1400 MAD',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ];

  const categories = ['Toutes', 'Génie civil', 'Informatique', 'Topographie'];

  const handleCategoryChange = (category) => {
    setSelectedCategories([category]);
    setVisibleCount(4);
  };

  const filteredFormations = useMemo(() => {
    if (selectedCategories.includes('Toutes')) {
      return formations;
    }
    return formations.filter(formation =>
      selectedCategories.includes(formation.category)
    );
  }, [selectedCategories]);

  const visibleFormations = filteredFormations.slice(0, visibleCount);
  const hasMoreFormations = filteredFormations.length > visibleCount;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredFormations.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Header */}
      <div style={{ backgroundColor: '#21B573' }} className="text-white py-6 md:py-8 px-4 mb-6">
        <div className="md:ml-6 mx-auto">
          <h1 className="text-xl text-black md:text-2xl font-ibm lg:text-3xl font-bold mb-2">Formations 100% à distance</h1>
          <p className="text-sm text-black md:text-base font-ibm lg:text-lg opacity-90">Formez-vous en ligne, à votre rythme.</p>
        </div>
      </div>

      <div className="mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar - Full width on mobile, fixed width on desktop */}
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
              {visibleFormations.map(formation => (
                <div key={formation.id} className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  {/* Course Image */}
                  <div className="h-32 md:h-40 lg:h-48 overflow-hidden bg-gray-200">
                    <img
                      src={formation.image}
                      alt={formation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Course Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold text-base md:text-lg lg:text-xl mb-3 md:mb-4 text-gray-900">
                      {formation.name}
                    </h3>

                    {/* Info Grid - Two Columns */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-3 text-xs md:text-sm mb-4 md:mb-6">
                      {/* Left Column */}
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Durée : {formation.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Volume Horaire : {formation.volumeHoraire}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Langue : {formation.language}</span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Rythme : {formation.rhythm}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Sessions Annuelles : {formation.sessions}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>Tarif : {formation.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Buttons - Centered */}
                    <div className="flex justify-center gap-3">
                      <button className="px-4 py-2 font-semibold md:px-6 md:py-3 bg-transparent border md:border-2 border-gray-900 rounded-full text-xs md:text-sm text-gray-900 hover:bg-gray-200 transition-colors">
                        Voir Programme
                      </button>
                      <button
                        className="px-8 py-2 font-semibold md:px-12 md:py-3 rounded-full text-xs md:text-base text-black hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#21B573' }}
                      >
                        S'inscrire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Afficher Plus Button */}
            {hasMoreFormations && (
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleShowMore}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full transition-colors duration-200"
                >
                  Afficher plus
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredFormations.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">Aucune formation trouvée</h3>
                <p className="text-sm md:text-base text-gray-600">Essayez de modifier vos critères de sélection</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Formation;