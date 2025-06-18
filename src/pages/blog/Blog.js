import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; // Adjust this if your axios instance is in a different file
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://gomyclassapi.site"

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Hardcoded categories like your image
    const categories = ['Bac', 'NE'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('/articles/published');
                setArticles(res.data.data);                                
                setFilteredArticles(res.data.data);
            } catch (err) {
                setError('Échec du chargement des articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        filterArticles();
    }, [searchTerm, activeCategory]);

    const filterArticles = () => {
        let filtered = articles;

        if (activeCategory) {
            filtered = filtered.filter((a) => a.category === activeCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter((a) =>
                a.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredArticles(filtered);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Green Gradient Top Line */}
            <div className="h-16 bg-gradient-to-r from-[#21B573] to-white" />

            <div className="md:ml-6 mx-auto px-4 py-10">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded-lg px-4 pr-12 py-2 focus:outline-none focus:ring"
                            placeholder="Rechercher un article..."
                        />
                        <FiSearch className="absolute top-2.5 right-3 text-gray-500" />
                    </div>
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-3 mb-6 mt-12">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
                            className={`px-12 py-2 border rounded-lg text-sm ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Cards */}
                {loading ? (
                    <p className="text-center text-gray-600">Chargement...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredArticles.length === 0 ? (
                    <p className="text-center text-gray-500">Aucun article trouvé.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredArticles.map((article) => (
                            <div
                                key={article._id}
                                onClick={() => navigate(`/blog/${article.slug}`)}
                                className="bg-gray-100 cursor-pointer rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative">
                                    {article.thumbnail ? (
                                        <img
                                            src={`${BASE_URL}${article.thumbnail}`}
                                            alt={article.title}
                                            className="w-full h-80"
                                        />
                                    ) : (
                                        <div className="w-full h-80 bg-gray-300 flex items-center justify-center text-gray-500">
                                            Pas d'image
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3">
                                        <p className="text-xs text-gray-300 mb-1">{article.category}</p>
                                        <h2 className="text-xs font-semibold text-white leading-tight">
                                            {article.title.length > 50 ? article.title.slice(0, 50) + '...' : article.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
