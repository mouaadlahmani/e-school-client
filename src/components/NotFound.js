import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#D9D9D942] px-4 py-12 font-inter text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10">
                    {/* Left content */}
                    <div>
                        <h1 className="text-4xl font-bold text-black mb-4">Oops ! Page introuvable</h1>
                        <p className="text-black mb-6 text-lg">
                            La page que vous cherchez n’existe pas ou a été déplacée.
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-8 py-3 bg-[#21B573] text-black text-base rounded-full font-semibold hover:bg-[#1aa764] transition-colors"
                        >
                            Retour à l’accueil
                        </Link>
                    </div>

                    {/* Right icon */}
                    <svg
                        width="120"
                        height="122"
                        viewBox="0 0 131 133"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="sm:ml-8"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M72.1626 0.437461C87.2626 1.38121 101.419 8.93121 111.8 19.3125C124.069 32.525 130.675 48.5687 130.675 67.4437C130.675 82.5437 125.013 96.7 115.575 108.969C106.138 120.294 92.9251 128.787 77.8251 131.619C62.7251 134.45 47.6251 132.562 34.4126 125.012C21.2001 117.462 10.8189 106.137 5.15637 91.9812C-0.506129 77.825 -1.44988 61.7812 3.26887 47.625C7.98762 32.525 16.4814 20.2562 29.6939 11.7625C41.9626 3.26871 57.0626 -0.506289 72.1626 0.437461ZM76.8814 122.181C89.1501 119.35 100.475 112.744 108.969 102.362C116.519 91.9812 121.238 79.7125 120.294 66.5C120.294 51.4 114.631 36.3 104.25 25.9187C94.8126 16.4812 83.4876 10.8187 70.2751 9.87496C58.0064 8.93121 44.7939 11.7625 34.4126 19.3125C24.0314 26.8625 16.4814 37.2437 12.7064 50.4562C8.93137 62.725 8.93137 75.9375 14.5939 88.2062C20.2564 100.475 28.7501 109.912 40.0751 116.519C51.4001 123.125 64.6126 125.012 76.8814 122.181ZM65.5564 61.7812L88.2064 38.1875L94.8126 44.7937L72.1626 68.3875L94.8126 91.9812L88.2064 98.5875L65.5564 74.9937L42.9064 98.5875L36.3001 91.9812L58.9501 68.3875L36.3001 44.7937L42.9064 38.1875L65.5564 61.7812Z"
                            fill="#21B573"
                            fillOpacity="0.77"
                        />
                    </svg>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;
