import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { FaRegListAlt, FaFolder, FaFolderOpen, FaFilePdf } from 'react-icons/fa';

const Title = () => {
    const [titleData, setTitleData] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [folderPdfs, setFolderPdfs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const titleRes = await axios.get(`subject/titles/${id}`);
                const titles = titleRes.data;

                const promises = titles.map(async (title) => {
                    const folderRes = await axios.get(`title/folders/${title._id}`);
                    return {
                        ...title,
                        folders: folderRes.data
                    };
                });

                const titleWithFolders = await Promise.all(promises);
                setTitleData(titleWithFolders);
            } catch (error) {
                console.error('Error fetching titles and folders:', error.message);
            }
        };

        fetchTitles();
    }, [id]);

    const handleFolderClick = async (folderId) => {
        if (selectedFolderId === folderId) {
            setSelectedFolderId(null); // collapse
            return;
        }

        setSelectedFolderId(folderId);

        // If already loaded, skip
        if (folderPdfs[folderId]) return;

        try {
            const res = await axios.get(`/folder/${folderId}`);
            setFolderPdfs((prev) => ({
                ...prev,
                [folderId]: res.data.pdfList || [],
            }));
        } catch (error) {
            console.error("Failed to load PDFs:", error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white py-10 px-4 md:px-12">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#4335A7]">Titles & Folders</h1>
                    <p className="text-gray-600 mt-2 text-lg">Access PDFs organized by subject titles</p>
                </div>

                {/* Titles & Folders List */}
                <div className="max-w-5xl mx-auto space-y-8">
                    {titleData.length > 0 ? (
                        titleData.map((title) => (
                            <div key={title._id} className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6">
                                {/* Title Block */}
                                <div className="flex items-center gap-3 mb-4">
                                    <FaRegListAlt className="text-2xl text-[#4335A7]" />
                                    <h2 className="text-2xl font-semibold text-[#4335A7]">{title.name}</h2>
                                </div>

                                {/* Folder List */}
                                <div className="ml-6 space-y-3">
                                    {title.folders.length > 0 ? (
                                        title.folders.map((folder) => (
                                            <div key={folder._id}>
                                                <div
                                                    onClick={() => handleFolderClick(folder._id)}
                                                    className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-[#4335A7] transition"
                                                >
                                                    {selectedFolderId === folder._id ? (
                                                        <FaFolderOpen className="text-[#4335A7]" />
                                                    ) : (
                                                        <FaFolder className="text-[#4335A7]" />
                                                    )}
                                                    <span className="font-medium">{folder.name}</span>
                                                </div>

                                                {/* PDF List */}
                                                {selectedFolderId === folder._id && (
                                                    <div className="ml-6 mt-2 space-y-2">
                                                        {folderPdfs[folder._id]?.length > 0 ? (
                                                            folderPdfs[folder._id].map((pdf, idx) => {
                                                                const pdfUrl =
                                                                    typeof pdf === 'string'
                                                                        ? (pdf.startsWith('http') ? pdf : `http://localhost:1337${pdf}`)
                                                                        : (pdf.url.startsWith('http') ? pdf.url : `http://localhost:1337${pdf.url}`);
                                                                const displayName = pdf.name || `PDF ${idx + 1}`;

                                                                return (
                                                                    <a
                                                                        key={idx}
                                                                        href={pdfUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-sm text-[#4335A7] hover:underline"
                                                                    >
                                                                        <FaFilePdf className="text-red-500" />
                                                                        {displayName}
                                                                    </a>
                                                                );
                                                            })
                                                        ) : (
                                                            <p className="text-sm italic text-gray-400">No PDFs available</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm italic text-gray-400">No folders found</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic">No titles found for this subject.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Title;
