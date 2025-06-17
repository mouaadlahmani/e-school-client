import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import inscription from '../assets/images/sinscrire.jpg';
import axios from "../api/axios";
import { motion, AnimatePresence } from 'framer-motion';


// InputField component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
        />
    </div>
);

// CheckboxGroup component
const CheckboxGroup = ({ label, name, options, formData, setFormData }) => {
    const handleChange = (e) => {
        const { value, checked } = e.target;
        const currentValues = formData[name] || [];
        const updatedValues = checked
            ? [...currentValues, value]
            : currentValues.filter((val) => val !== value);

        setFormData((prev) => ({ ...prev, [name]: updatedValues }));
    };

    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <div className="flex flex-wrap gap-4">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={option}
                            checked={formData[name]?.includes(option)}
                            onChange={handleChange}
                            className="accent-[#21B573]"
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

// RadioGroup component
const RadioGroup = ({ label, name, options, formData, onChange }) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <div className="flex flex-wrap gap-4">
            {options.map((option, index) => (
                <label key={index} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={formData[name] === option}
                        onChange={onChange}
                        className="accent-[#21B573]"
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

// Single Checkbox component
const Checkbox = ({ label, name, checked, onChange }) => (
    <label className="flex items-center gap-2">
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={(e) =>
                onChange({
                    target: {
                        name,
                        value: e.target.checked,
                        type: 'checkbox',
                        checked: e.target.checked,
                    },
                })
            }
            className="accent-[#21B573]"
        />
        {label}
    </label>
);

const FormationInscrire = () => {
    const [formData, setFormData] = useState({
        nom: '',
        nationalite: [],
        email: '',
        telephone: '',
        diplome: '',
        etablissement: '',
        specialite: '',
        statut: [],
        formation: '',
        secteur: [],
        niveau: '',
        session: '',
        paiement: '',
        engagementConditions: false,
        engagementVeracite: false,
        type: "sInscrire"
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

        if (!formData.engagementConditions || !formData.engagementVeracite) {
            alert("Vous devez accepter les conditions générales et certifier l'exactitude des informations.");
            return;
        }

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
                type: 'sInscrire'
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
                    <h1 className="text-3xl font-bold mb-1">Formulaire d’inscription à une formation – GoMyClass</h1>
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
                            {/* Nom et prénom */}
                            <InputField label="Nom et prénom" name="nom" value={formData.nom} onChange={handleInputChange} />

                            {/* Nationalité */}
                            <CheckboxGroup label="Nationalité" name="nationalite" options={['Marocaine', 'Étrangère']} formData={formData} setFormData={setFormData} />

                            {/* Adresse électronique */}
                            <InputField label="Adresse électronique" name="email" value={formData.email} onChange={handleInputChange} type="email" />

                            {/* Téléphone */}
                            <InputField label="Numéro de téléphone" name="telephone" value={formData.telephone} onChange={handleInputChange} type="tel" />

                            {/* Diplôme */}
                            <InputField label="Dernier diplôme obtenu" name="diplome" value={formData.diplome} onChange={handleInputChange} />

                            {/* Établissement */}
                            <InputField label="Établissement / Université" name="etablissement" value={formData.etablissement} onChange={handleInputChange} />

                            {/* Spécialité */}
                            <InputField label="Spécialité" name="specialite" value={formData.specialite} onChange={handleInputChange} />

                            {/* Statut actuel */}
                            <CheckboxGroup label="Statut actuel" name="statut" options={['Étudiant', 'Technicien', 'Ingénieur', 'Sans emploi', 'Autre']} formData={formData} setFormData={setFormData} />

                            {/* Formation choisie */}
                            <InputField label="Formation choisie" name="formation" value={formData.formation} onChange={handleInputChange} />

                            {/* Secteur */}
                            <CheckboxGroup label="Secteur" name="secteur" options={['Génie Civil', 'Informatique', 'Infographie']} formData={formData} setFormData={setFormData} />

                            {/* Niveau */}
                            <RadioGroup label="Niveau de la formation" name="niveau" options={['Débutant', 'Intermédiaire', 'Avancé']} formData={formData} onChange={handleInputChange} />

                            {/* Session */}
                            <RadioGroup label="Session souhaitée" name="session" options={['01 juillet', '01 novembre', '01 mars']} formData={formData} onChange={handleInputChange} />

                            {/* Paiement */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Mode de paiement</label>
                                <div className="flex flex-wrap gap-6">
                                    {[
                                        'Carte bancaire (Visa / Mastercard / CMI)',
                                        'Virement bancaire',
                                        'Agence de transfert',
                                        'PayPal',
                                    ].map((option, index) => (
                                        <label key={index} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="paiement"
                                                value={option}
                                                checked={formData.paiement === option}
                                                onChange={handleInputChange}
                                                className="accent-[#21B573]"
                                                required
                                            />
                                            <span className="text-black">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Engagement */}
                            <Checkbox
                                label="J’accepte les conditions générales de GoMyClass."
                                name="engagementConditions"
                                checked={formData.engagementConditions}
                                onChange={handleInputChange}
                                required
                            />

                            <Checkbox
                                label="Je certifie que les informations fournies sont exactes."
                                name="engagementVeracite"
                                checked={formData.engagementVeracite}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="bg-[#21B573] text-black px-8 py-3 rounded-md hover:bg-[#1a9461] transition">Envoyer</button>
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
                                onClick={() => navigate("/formation")}
                                className="bg-[#21B573] hover:bg-[#1a9461] text-white font-semibold text-sm md:text-base py-3 px-8 rounded-md transition-shadow shadow-md hover:shadow-lg"
                            >
                                Retour à Formations
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FormationInscrire;
