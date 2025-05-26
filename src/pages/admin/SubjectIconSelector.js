import React, { useState } from 'react';
import {
    FaBookOpen, FaCalculator, FaFlask, FaGlobe, FaHistory,
    FaPalette, FaRunning, FaLaptop, FaLanguage, FaMusic,
    FaMicroscope, FaAtom, FaDna, FaLeaf, FaRocket,
    FaPencilAlt, FaTheaterMasks, FaCamera, FaHammer,
    FaChartLine, FaCoins, FaBalanceScale, FaUsers,
    FaHeart, FaBrain, FaEye, FaStethoscope, FaPills,
    FaFolder, FaFolderOpen, FaRegFolder, FaRegFolderOpen
} from 'react-icons/fa';

import {
    MdScience, MdBiotech, MdEngineering, MdComputer,
    MdPsychology, MdPublic, MdArchitecture, MdDesignServices
} from 'react-icons/md';

import {
    GiMolecule, GiDna2, GiBookshelf, GiPaintBrush,
    GiSoccerBall, GiWeightLiftingUp
} from 'react-icons/gi';

import { BiMath } from 'react-icons/bi';
import { GrLanguage } from 'react-icons/gr';
import { HiMiniLanguage } from 'react-icons/hi2';
import { SiHtmlacademy } from "react-icons/si";
import { MdOutlineFolderCopy, MdFolderCopy } from "react-icons/md";
import { WiMoonWaningCrescent4 } from "react-icons/wi";
import { FaFlag } from "react-icons/fa6";

const SUBJECT_ICONS = [
    // 📚 School-Focused Icons (Top Priority)
    { name: 'Folder', icon: FaFolder, label: 'Folder' },
    { name: 'EmptyFolder', icon: FaRegFolder, label: 'Empty Folder' },
    { name: 'OpenFolder', icon: FaFolderOpen, label: 'Open Folder' },
    { name: 'EmptyOpenFolder', icon: FaRegFolderOpen, label: 'Empty Open Folder' },
    { name: 'TwoFolders', icon: MdFolderCopy, label: 'TwoFolders' },
    { name: 'TwoEmptyFolders', icon: MdOutlineFolderCopy, label: 'Two Empty Folders' },
    { name: 'Academic', icon: SiHtmlacademy, label: 'Academic Level' },
    { name: 'BookOpen', icon: FaBookOpen, label: 'General Studies' },
    { name: 'PencilAlt', icon: FaPencilAlt, label: 'Writing' },
    { name: 'Language', icon: FaLanguage, label: 'Languages' },
    { name: 'Language1', icon: GrLanguage, label: 'Languages' },
    { name: 'Language2', icon: HiMiniLanguage, label: 'Languages' },
    { name: 'Crescent', icon: WiMoonWaningCrescent4, label: 'Crescent' },
    { name: 'Flag', icon: FaFlag, label: 'Flag' },
    { name: 'Math', icon: BiMath, label: 'Math' },
    { name: 'Calculator', icon: FaCalculator, label: 'Mathematics' },
    { name: 'Science', icon: MdScience, label: 'General Science' },
    { name: 'Flask', icon: FaFlask, label: 'Chemistry' },
    { name: 'Microscope', icon: FaMicroscope, label: 'Biology' },
    { name: 'Atom', icon: FaAtom, label: 'Physics' },
    { name: 'Dna', icon: FaDna, label: 'Genetics' },
    { name: 'Molecule', icon: GiMolecule, label: 'Molecular Science' },
    { name: 'Dna2', icon: GiDna2, label: 'Life Sciences' },

    // 🎓 Other Academic Subjects
    { name: 'Bookshelf', icon: GiBookshelf, label: 'Literature' },
    { name: 'History', icon: FaHistory, label: 'History' },
    { name: 'Globe', icon: FaGlobe, label: 'Geography' },
    { name: 'Psychology', icon: MdPsychology, label: 'Psychology' },
    { name: 'Public', icon: MdPublic, label: 'Social Studies' },
    { name: 'Users', icon: FaUsers, label: 'Sociology' },
    { name: 'Brain', icon: FaBrain, label: 'Neuroscience' },
    { name: 'BalanceScale', icon: FaBalanceScale, label: 'Law/Ethics' },
    { name: 'Biotech', icon: MdBiotech, label: 'Biotechnology' },
    { name: 'Leaf', icon: FaLeaf, label: 'Environmental Science' },
    { name: 'Rocket', icon: FaRocket, label: 'Astronomy/Physics' },

    // 🎨 Arts & Creativity
    { name: 'Palette', icon: FaPalette, label: 'Art' },
    { name: 'PaintBrush', icon: GiPaintBrush, label: 'Fine Arts' },
    { name: 'Music', icon: FaMusic, label: 'Music Theory' },
    { name: 'TheaterMasks', icon: FaTheaterMasks, label: 'Drama/Theater' },
    { name: 'Camera', icon: FaCamera, label: 'Photography' },
    { name: 'DesignServices', icon: MdDesignServices, label: 'Design' },

    // 💻 Technology & Engineering
    { name: 'Laptop', icon: FaLaptop, label: 'Computer Science' },
    { name: 'Computer', icon: MdComputer, label: 'Information Technology' },
    { name: 'Engineering', icon: MdEngineering, label: 'Engineering' },
    { name: 'Architecture', icon: MdArchitecture, label: 'Architecture' },
    { name: 'Hammer', icon: FaHammer, label: 'Construction/Tech' },

    // 📊 Business & Economics
    { name: 'ChartLine', icon: FaChartLine, label: 'Economics/Business' },
    { name: 'Coins', icon: FaCoins, label: 'Finance' },

    // 🏃 Health & Physical Education
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

                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 max-h-96 overflow-y-auto p-2">
                    {filteredIcons.map((iconData) => {
                        const IconComponent = iconData.icon;
                        const isSelected = selectedIcon === iconData.name;

                        return (
                            <button
                                key={iconData.name}
                                onClick={() => onIconSelect(iconData)}
                                title={iconData.label}
                                className={`
          group flex flex-col items-center justify-center
          p-3 rounded-xl border-2 transition-all
          ${isSelected ? 'border-[#4335A7] bg-[#4335A7]/10' : 'border-gray-200 hover:bg-gray-50'}
        `}
                            >
                                <IconComponent
                                    size={26}
                                    className={`transition-colors duration-200 ${isSelected ? 'text-[#4335A7]' : 'text-gray-600 group-hover:text-[#4335A7]'}`}
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