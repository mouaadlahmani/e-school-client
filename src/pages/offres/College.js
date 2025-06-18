import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const College = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Mois');

    const features = [
        "Cours et exercices structurés (Accès aux PDF)",
        "Évaluations mensuelles des progrès",
        "18+ heures de live par matière chaque mois",
        "Préparation intensive aux examens",
        "Sessions d'orientation scolaire",
        "Chat avec un prof pour toutes tes questions"
    ];

    const getPricing = () => {
        switch (selectedPeriod) {
            case 'Mois':
                return { price: '400', period: 'Dh' };
            case 'Semestre':
                return { price: '750', period: 'Dh', oldPrice: '800' };
            case 'Année scolaire':
                return { price: '1400', period: 'Dh', oldPrice: '1600' };
            default:
                return { price: '400', period: 'Dh' };
        }
    };

    const PricingCard = ({ title, subtitle, index }) => {
        const { price, period, oldPrice } = getPricing();

        return (
            <div
                className="group relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-102 overflow-hidden"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                }}
            >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="text-center mb-5">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <Check className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 leading-snug">
                            <span className="font-ibm font-semibold">{title}:</span><br />
                            <span className="font-inter font-bold">{subtitle}</span>
                        </h3>
                        <div className="w-full h-[1px] bg-black mb-5" />

                    </div>

                    <div className="text-center mb-5">
                        {oldPrice && (
                            <div className="mb-1">
                                <span className="text-sm text-red-500 line-through font-semibold">{oldPrice} Dh</span>
                                <span className="ml-1 bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
                                </span>
                            </div>
                        )}
                        <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {price}
                            </span>
                            <span className="text-sm text-gray-500 ml-1 font-medium">{period}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {features.map((feature, featureIndex) => (
                            <div
                                key={featureIndex}
                                className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300"
                                style={{ transitionDelay: `${featureIndex * 50}ms` }}
                            >
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-xs text-gray-700 leading-relaxed font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action button */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                        <button
                            className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                            style={{ backgroundColor: '#21B573' }}
                        >
                            S'inscrire maintenant
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full opacity-30 group-hover:opacity-70 group-hover:scale-125 transition-all duration-700"></div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
            <Navbar />
            {/* Header */}
            <div className="text-white p-6 relative overflow-hidden" style={{ backgroundColor: '#21B573' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl md:ml-6 font-bold leading-tight">
                        Inscrivez-vous à plusieurs matières pour bénéficier<br />
                        <span className="text-green-100">d'une remise sur le prix total.</span>
                    </h1>
                </div>
                {/* Decorative shapes */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
            </div>

            {/* Period Selection */}
            <div className="p-6">
                <div className="flex justify-center mb-8">
                    <div className="flex bg-white rounded-xl p-1.5 shadow-lg border border-gray-200">
                        {['Mois', 'Semestre', 'Année scolaire'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${selectedPeriod === period
                                    ? 'text-white shadow-md transform scale-105'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                style={selectedPeriod === period ? { backgroundColor: '#21B573' } : {}}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="max-w-6xl mx-auto">
                    {/* Top Row - 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <PricingCard
                            title="Sciences Mathématiques"
                            subtitle="SMA & SMB"
                            index={0}
                        />
                        <PricingCard
                            title="Sciences Physiques"
                            subtitle="SPC & SVT"
                            index={1}
                        />
                        <PricingCard
                            title="Sciences Économiques"
                            subtitle="SGC & SH"
                            index={2}
                        />
                    </div>

                    {/* Bottom Row - 2 Cards Centered */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="w-full max-w-sm">
                            <PricingCard
                                title="Lettres & Langues"
                                subtitle="LA & LLM"
                                index={3}
                            />
                        </div>
                        <div className="w-full max-w-sm">
                            <PricingCard
                                title="Formation Professionnelle"
                                subtitle="FP & TE"
                                index={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default College;