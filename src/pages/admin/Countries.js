import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';

const Countries = () => {
  const [countryData, setCountryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCountry, setNewCountry] = useState({ name: '' });
  const [step, setStep] = useState(1);
  const [addedCountryId, setAddedCountryId] = useState(null);
  const [levels, setLevels] = useState(['']);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountriesAndLevels();
  }, []);

  const fetchCountriesAndLevels = async () => {
    try {
      const countryRes = await axios.get('country');
      const countries = countryRes.data;

      const promises = countries.map(async (country) => {
        const levelsRes = await axios.get(`country/levels/${country._id}`);
        return {
          ...country,
          levels: levelsRes.data
        };
      });

      const countriesWithLevels = await Promise.all(promises);
      setCountryData(countriesWithLevels);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;
    try {
      await axios.delete(`country/${id}`);
      fetchCountriesAndLevels();
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const handleAddCountry = async () => {
    if (!newCountry.name.trim()) return alert("Country name is required.");
    try {
      const res = await axios.post("country", newCountry);
      setAddedCountryId(res.data._id);
      setStep(2);
    } catch (error) {
      console.error("Add country failed:", error.message);
    }
  };

  const handleAddLevels = async () => {
    try {
      const trimmedLevels = levels.filter(l => l.trim() !== '');
      const promises = trimmedLevels.map(name =>
        axios.post("level", { name, countryId: addedCountryId })
      );
      await Promise.all(promises);
      resetModal();
      fetchCountriesAndLevels();
    } catch (error) {
      console.error("Add levels failed:", error.message);
    }
  };

  const resetModal = () => {
    setNewCountry({ name: '' });
    setLevels(['']);
    setAddedCountryId(null);
    setStep(1);
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-[#4335A7]">Manage Countries</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#4335A7] text-white px-4 py-2 rounded hover:bg-[#372c94] transition"
          >
            + Add Country
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countryData.map((country, idx) => (
            <motion.div
              key={country._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BiWorld className="text-2xl text-[#4335A7]" />
                  <h2 className="text-xl font-semibold text-[#4335A7]">{country.name}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/country/edit/${country._id}`)}
                    className="text-[#4335A7] hover:text-blue-800"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(country._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              <div className="mt-4 ml-6">
                {country.levels.length > 0 ? (
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {country.levels.map((level) => (
                      <li key={level._id}>{level.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm italic text-gray-400">No levels found</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {step === 1 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-[#4335A7]">Add Country Name</h2>
                  <input
                    type="text"
                    placeholder="Country name"
                    value={newCountry.name}
                    onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                  />
                  <div className="flex justify-end gap-3">
                    <button onClick={resetModal} className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100">
                      Cancel
                    </button>
                    <button onClick={handleAddCountry} className="px-4 py-2 rounded bg-[#4335A7] text-white hover:bg-[#372c94]">
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-[#4335A7]">Add Levels</h2>
                  {levels.map((level, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={level}
                      onChange={(e) => {
                        const updated = [...levels];
                        updated[idx] = e.target.value;
                        setLevels(updated);
                      }}
                      placeholder={`Level ${idx + 1}`}
                      className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                    />
                  ))}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => setLevels([...levels, ''])}
                      className="text-sm text-[#4335A7] hover:underline"
                    >
                      + Add another level
                    </button>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={resetModal} className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100">
                      Cancel
                    </button>
                    <button onClick={handleAddLevels} className="px-4 py-2 rounded bg-[#4335A7] text-white hover:bg-[#372c94]">
                      Save
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Countries;
