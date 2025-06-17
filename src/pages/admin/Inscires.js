import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { BsThreeDots } from "react-icons/bs";

const Inscrires = () => {
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApply, setSelectedApply] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [applyToDelete, setApplyToDelete] = useState(null);

  const fetchApplies = async () => {
    try {
      const res = await axios.get('/applies/sInscrire');
      setApplies(res.data);
    } catch (error) {
      console.error('Error fetching applies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplies();
  }, []);

  const handleDeleteClick = (apply) => {
    setApplyToDelete(apply);
    setDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!applyToDelete) return;
    try {
      await axios.delete(`/applies/${applyToDelete._id}`);
      setApplies(applies.filter((a) => a._id !== applyToDelete._id));
      setDeleteConfirmModal(false);
      setApplyToDelete(null);
    } catch (error) {
      console.error('Error deleting apply:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmModal(false);
    setApplyToDelete(null);
  };

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`/applies/${id}/read`, { read: !currentStatus });
      setApplies((prev) =>
        prev.map((apply) =>
          apply._id === id ? { ...apply, read: !currentStatus } : apply
        )
      );
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const openModal = (apply) => {
    setSelectedApply(apply);
    if (!apply.read) toggleReadStatus(apply._id, false);
  };

  const closeModal = () => {
    setSelectedApply(null);
  };

  if (loading) return <p className="p-6">Loading Formation Inscriptions...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-[#21B573] mb-6">Inscriptions</h2>

        {applies.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm mb-24">
            <table className="min-w-full">
              <thead className="bg-[#21B573] text-white">
                <tr>
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Téléphone</th>
                  <th className="text-left p-3">Niveau</th>
                  <th className="text-left p-3">Lu</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applies.map((apply) => (
                  <tr
                    key={apply._id}
                    className={`border-t hover:bg-[#f0fdf8] transition-colors duration-150 cursor-pointer ${!apply.read ? 'bg-[#f6fff9]' : ''}`}
                    onClick={() => openModal(apply)}
                  >
                    <td className="p-3">{apply.nomComplet || apply.nom || 'Anonyme'}</td>
                    <td className="p-3">{apply.email || '—'}</td>
                    <td className="p-3">{apply.telephone}</td>
                    <td className="p-3">{apply.niveauScolaire || apply.niveau || '—'}</td>
                    <td className="p-3">{apply.read ? '✔️' : '❌'}</td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(apply);
                        }}
                      >
                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />

      {/* View Modal */}
      <AnimatePresence>
        {selectedApply && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-[#21B573] mb-4">
                Détails de la candidature
              </h3>
              <div className="space-y-2 text-sm text-gray-800">
                <p><strong>Nom complet:</strong> {selectedApply.nomComplet || selectedApply.nom || '—'}</p>
                <p><strong>Email:</strong> {selectedApply.email || '—'}</p>
                <p><strong>Téléphone:</strong> {selectedApply.telephone || '—'}</p>
                <p><strong>Nationalité:</strong> {selectedApply.nationalite?.join(', ') || '—'}</p>
                <p><strong>Diplôme:</strong> {selectedApply.diplome || '—'}</p>
                <p><strong>Établissement:</strong> {selectedApply.etablissement || '—'}</p>
                <p><strong>Spécialité:</strong> {selectedApply.specialite || '—'}</p>
                <p><strong>Statut:</strong> {selectedApply.statut?.join(', ') || '—'}</p>
                <p><strong>Formation:</strong> {selectedApply.formation || '—'}</p>
                <p><strong>Secteur:</strong> {selectedApply.secteur?.join(', ') || '—'}</p>
                <p><strong>Niveau:</strong> {selectedApply.niveau || '—'}</p>
                <p><strong>Session:</strong> {selectedApply.session || '—'}</p>
                <p><strong>Mode de paiement:</strong> {selectedApply.paiement || '—'}</p>
                <p><strong>Conditions acceptées:</strong> {selectedApply.engagementConditions ? 'Oui' : 'Non'}</p>
                <p><strong>Déclare sincérité:</strong> {selectedApply.engagementVeracite ? 'Oui' : 'Non'}</p>
                <p><strong>Marqué comme lu:</strong> {selectedApply.read ? '✔️' : <BsThreeDots/>}</p>
                <p className="text-xs text-gray-500">
                  <strong>Soumis le:</strong> {new Date(selectedApply.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center"
            >
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                Supprimer la candidature ?
              </h3>
              <p className="text-gray-600 mb-6">
                Cette action est irréversible. Êtes-vous sûr de vouloir supprimer
                cette candidature ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inscrires;
