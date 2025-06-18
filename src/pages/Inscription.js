import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import inscription from '../assets/images/inscription.png';
import axios from "../api/axios";
import { motion, AnimatePresence } from 'framer-motion';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const Inscription = () => {
    const [formData, setFormData] = useState({
        nomComplet: '',
        telephone: '',
        email: '',
        niveauScolaire: '',
        matieres: [],
        accepteConditions: false,
        type: "inscription"
    });

    const navigate = useNavigate();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'matieres') {
            setFormData((prev) => {
                const newMatieres = checked
                    ? [...prev.matieres, value]
                    : prev.matieres.filter((m) => m !== value);
                return { ...prev, matieres: newMatieres };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/applies", formData);
            setSuccessModalOpen(true);
            setFormData({
                nomComplet: '',
                telephone: '',
                email: '',
                niveauScolaire: '',
                matieres: [],
                accepteConditions: false,
                type: 'inscription'
            });
        } catch (error) {
            const message = error.response?.data?.message || "Une erreur s’est produite. Veuillez réessayer.";
            setErrorMessage(message);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <motion.div
                className="bg-[#21B573] text-black py-10 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="md:ml-6 mx-auto">
                    <h1 className="text-3xl font-bold mb-1">Formulaire d’inscription GoMyClass</h1>
                    <p className="text-xl font-semibold">École / Collège / Lycée</p>
                </div>
            </motion.div>

            <AnimatePresence>
                {errorMessage && (
                    <motion.p
                        className="text-red-600 mt-4 font-semibold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </AnimatePresence>

            <div className="md:ml-6 mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <motion.div
                        className="bg-[#F8F8F8] max-h-200 p-8 shadow rounded-lg"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <p className="text-gray-900 mb-6 font-medium">Veuillez remplir et envoyer le formulaire suivant :</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <motion.div variants={fadeInUp} custom={0}>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Nom complet :</label>
                                <input
                                    type="text"
                                    name="nomComplet"
                                    value={formData.nomComplet}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-[#D9D9D96B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#21B573]"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={fadeInUp} custom={1}>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Numéro de téléphone :</label>
                                <PhoneInput
                                    country={'ma'}
                                    value={formData.telephone}
                                    onChange={(phone) => setFormData(prev => ({ ...prev, telephone: phone }))}
                                    inputClass="custom-phone-input"
                                    containerClass="custom-phone-container"
                                    buttonClass="custom-phone-button"
                                    dropdownClass="custom-phone-dropdown"
                                    inputProps={{
                                        name: 'telephone',
                                        required: true,
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={fadeInUp} custom={2}>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Adresse email :</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-[#D9D9D96B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#21B573]"
                                />
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Niveau scolaire :</label>
                                <div className="flex space-x-6">
                                    {['École primaire', 'Collège', 'Lycée'].map((niveau) => (
                                        <label key={niveau} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name="niveauScolaire"
                                                value={niveau}
                                                checked={formData.niveauScolaire === niveau}
                                                onChange={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        niveauScolaire: prev.niveauScolaire === niveau ? '' : niveau,
                                                    }))
                                                }
                                                className="mr-2 accent-[#21B573]"
                                            />
                                            {niveau}
                                        </label>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div className="pt-4" variants={fadeInUp}>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="accepteConditions"
                                        checked={formData.accepteConditions}
                                        onChange={handleInputChange}
                                        className="mt-1 mr-3 accent-[#21B573]"
                                        required
                                    />
                                    <span className="text-sm text-gray-900">
                                        J’accepte les conditions générales de GoMyClass.
                                    </span>
                                </label>
                            </motion.div>

                            <motion.div className="pt-4 flex justify-end" variants={fadeInUp}>
                                <button
                                    type="submit"
                                    className="bg-[#21B573] hover:bg-[#1a9461] text-black font-medium py-3 px-8 rounded-md transition-colors duration-200"
                                >
                                    Envoyer
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>

                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={inscription}
                            alt="Illustration inscription"
                            className="w-full max-w-[700px] h-auto transform scale-x-[-1]"
                        />
                    </motion.div>
                </div>
            </div>

            <Footer />

            {/* Success Modal */}
            <AnimatePresence>
                {successModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="bg-white rounded-3xl px-8 py-10 shadow-2xl max-w-lg w-full text-center relative"
                        >
                            <div className="flex justify-center mb-6 relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 1.1, 1], opacity: [0, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute w-24 h-24 bg-green-100 rounded-full"
                                    style={{ zIndex: -1 }}
                                />
                                <svg width="90" height="90" viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M70.4996 0.0830078C31.6098 0.0830078 0.0830078 31.6098 0.0830078 70.4996C0.0830078 109.389 31.6098 140.916 70.4996 140.916C109.389 140.916 140.916 109.389 140.916 70.4996C140.916 31.6098 109.39 0.0830078 70.4996 0.0830078ZM70.4996 126.833C39.4376 126.833 14.1665 101.562 14.1665 70.4996C14.1665 39.4372 39.4372 14.1665 70.4996 14.1665C101.562 14.1665 126.833 39.4372 126.833 70.4996C126.833 101.562 101.562 126.833 70.4996 126.833ZM97.0167 45.3413L106.974 55.2988L63.458 98.9972L37.3544 72.8936L47.3116 62.9362L63.458 79.0826L97.0167 45.3413Z"
                                        fill="#21B573"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">Inscription réussie !</h2>
                            <p className="text-gray-700 text-md md:text-lg leading-relaxed mb-8">
                                Votre inscription a été reçue avec succès.<br />
                                Un conseiller pédagogique vous contactera par appel, email ou WhatsApp sous 24 à 48 heures.
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="bg-[#21B573] hover:bg-[#1a9461] text-white font-semibold text-sm md:text-base py-3 px-8 rounded-md transition-shadow shadow-md hover:shadow-lg"
                            >
                                Retour à l’accueil
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Inscription;
