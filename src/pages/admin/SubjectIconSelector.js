import React, { useState } from 'react';
import {
  FaBookOpen, FaCalculator, FaFlask, FaGlobe, FaHistory,
  FaPalette, FaRunning, FaLaptop, FaLanguage, FaMusic,
  FaMicroscope, FaAtom, FaDna, FaLeaf, FaRocket,
  FaPencilAlt, FaTheaterMasks, FaCamera, FaHammer,
  FaChartLine, FaCoins, FaBalanceScale, FaUsers,
  FaHeart, FaBrain, FaEye, FaStethoscope, FaPills
} from 'react-icons/fa';
import {
  MdScience, MdBiotech, MdEngineering, MdComputer,
  MdPsychology, MdPublic, MdArchitecture, MdDesignServices
} from 'react-icons/md';
import {
  GiMolecule, GiDna2, GiBookshelf, GiPaintBrush,
  GiSoccerBall, GiWeightLiftingUp
} from 'react-icons/gi';

const SUBJECT_ICONS = [
  // General Academic
  { name: 'BookOpen', icon: FaBookOpen, label: 'General Studies' },
  { name: 'Bookshelf', icon: GiBookshelf, label: 'Literature' },
  { name: 'PencilAlt', icon: FaPencilAlt, label: 'Writing' },
  { name: 'Language', icon: FaLanguage, label: 'Languages' },

  // Mathematics & Sciences
  { name: 'Calculator', icon: FaCalculator, label: 'Mathematics' },
  { name: 'Flask', icon: FaFlask, label: 'Chemistry' },
  { name: 'Microscope', icon: FaMicroscope, label: 'Biology' },
  { name: 'Atom', icon: FaAtom, label: 'Physics' },
  { name: 'Dna', icon: FaDna, label: 'Genetics' },
  { name: 'Molecule', icon: GiMolecule, label: 'Molecular Science' },
  { name: 'Dna2', icon: GiDna2, label: 'Life Sciences' },
  { name: 'Science', icon: MdScience, label: 'General Science' },
  { name: 'Biotech', icon: MdBiotech, label: 'Biotechnology' },
  { name: 'Leaf', icon: FaLeaf, label: 'Environmental Science' },
  { name: 'Rocket', icon: FaRocket, label: 'Astronomy/Physics' },

  // Social Sciences & Humanities
  { name: 'Globe', icon: FaGlobe, label: 'Geography' },
  { name: 'History', icon: FaHistory, label: 'History' },
  { name: 'Public', icon: MdPublic, label: 'Social Studies' },
  { name: 'Users', icon: FaUsers, label: 'Sociology' },
  { name: 'Psychology', icon: MdPsychology, label: 'Psychology' },
  { name: 'Brain', icon: FaBrain, label: 'Neuroscience' },
  { name: 'BalanceScale', icon: FaBalanceScale, label: 'Law/Ethics' },

  // Arts & Creative
  { name: 'Palette', icon: FaPalette, label: 'Art' },
  { name: 'PaintBrush', icon: GiPaintBrush, label: 'Fine Arts' },
  { name: 'Music', icon: FaMusic, label: 'Music Theory' },
  { name: 'TheaterMasks', icon: FaTheaterMasks, label: 'Drama/Theater' },
  { name: 'Camera', icon: FaCamera, label: 'Photography' },
  { name: 'DesignServices', icon: MdDesignServices, label: 'Design' },

  // Technology & Engineering
  { name: 'Laptop', icon: FaLaptop, label: 'Computer Science' },
  { name: 'Computer', icon: MdComputer, label: 'Information Technology' },
  { name: 'Engineering', icon: MdEngineering, label: 'Engineering' },
  { name: 'Architecture', icon: MdArchitecture, label: 'Architecture' },
  { name: 'Hammer', icon: FaHammer, label: 'Construction/Tech' },

  // Business & Economics
  { name: 'ChartLine', icon: FaChartLine, label: 'Economics/Business' },
  { name: 'Coins', icon: FaCoins, label: 'Finance' },

  // Health & Physical Education
  { name: 'Running', icon: FaRunning, label: 'Physical Education' },
  { name: 'SoccerBall', icon: GiSoccerBall, label: 'Sports' },
  { name: 'WeightLifting', icon: GiWeightLiftingUp, label: 'Fitness' },
  { name: 'Heart', icon: FaHeart, label: 'Health Education' },
  { name: 'Stethoscope', icon: FaStethoscope, label: 'Medicine' },
  { name: 'Eye', icon: FaEye, label: 'Anatomy' },
  { name: 'Pills', icon: FaPills, label: 'Pharmacy' }
];

const SubjectIconSelector = ({ selectedIcon, onIconSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredIcons = SUBJECT_ICONS.filter(iconData =>
    iconData.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Subject Icon</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
          />
        </div>
        
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-h-96 overflow-y-auto">
          {filteredIcons.map((iconData) => {
            const IconComponent = iconData.icon;
            return (
              <button
                key={iconData.name}
                onClick={() => onIconSelect(iconData)}
                className={`p-3 rounded-lg border-2 transition-all hover:bg-gray-50 ${
                  selectedIcon === iconData.name 
                    ? 'border-[#4335A7] bg-[#4335A7] bg-opacity-10' 
                    : 'border-gray-200'
                }`}
                title={iconData.label}
              >
                <IconComponent 
                  size={24} 
                  className={selectedIcon === iconData.name ? 'text-[#4335A7]' : 'text-gray-600'} 
                />
              </button>
            );
          })}
        </div>
        
        {filteredIcons.length === 0 && (
          <p className="text-center text-gray-500 py-8">No icons found matching your search.</p>
        )}
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { SubjectIconSelector, SUBJECT_ICONS };