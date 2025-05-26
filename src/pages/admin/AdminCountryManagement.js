import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "../../components/navbar";
import { MdEdit, MdDelete, MdSave, MdAdd, MdExpandMore, MdExpandLess, MdAttachFile, MdFolder, MdBook, MdLibraryBooks, MdSchool, MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiHtmlacademy } from "react-icons/si";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiBookShelfLine } from "react-icons/ri";
import { PiSubtitlesLight } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { SubjectIconSelector, SUBJECT_ICONS } from "./SubjectIconSelector"; // Import the icon selector

const AdminCountryManagement = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [editName, setEditName] = useState("");
  const [levels, setLevels] = useState([]);
  const [newLevel, setNewLevel] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Navigation state
  const [currentView, setCurrentView] = useState('levels');
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  
  // Icon selection state
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    fetchCountryData();
  }, [id]);

  const fetchCountryData = async () => {
    try {
      setLoading(true);
      const [countryRes, levelsRes] = await Promise.all([
        axios.get(`/country/${id}`),
        axios.get(`/country/levels/${id}`)
      ]);
      setCountry(countryRes.data);
      setEditName(countryRes.data.name);
      setLevels(levelsRes.data);
      setCurrentData(levelsRes.data);
    } catch (error) {
      toast.error(`Error fetching country: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCountry = async () => {
    if (!editName.trim()) {
      toast.warning("Please enter a country name");
      return;
    }
    try {
      await axios.put(`/country/${id}`, { name: editName });
      toast.success("Country updated successfully!");
      fetchCountryData();
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
    }
  };

  const navigateTo = async (view, parentId, parentName, parentType) => {
    setLoadingData(true);
    try {
      let data = [];
      let endpoint = '';
      
      switch (view) {
        case 'academic':
          endpoint = `/level/academic/${parentId}`;
          break;
        case 'subjects':
          endpoint = `/academic/subjects/${parentId}`;
          break;
        case 'titles':
          endpoint = `/subject/titles/${parentId}`;
          break;
        case 'folders':
          endpoint = `/title/folders/${parentId}`;
          break;
        default:
          data = levels;
      }
      
      if (endpoint) {
        const res = await axios.get(endpoint);
        data = res.data;
      }
      
      setCurrentView(view);
      setCurrentData(data);
      
      if (view !== 'levels') {
        setBreadcrumb([...breadcrumb, { name: parentName, view: currentView, data: currentData, id: parentId, type: parentType }]);
      }
      
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  const goBack = () => {
    if (breadcrumb.length === 0) return;
    
    const previous = breadcrumb[breadcrumb.length - 1];
    setCurrentView(previous.view);
    setCurrentData(previous.data);
    setBreadcrumb(breadcrumb.slice(0, -1));
  };

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast.warning("Please enter a name");
      return;
    }
    
    // For subjects, require icon selection
    if (currentView === 'subjects' && !selectedIcon) {
      toast.warning("Please select an icon for the subject");
      return;
    }
    
    try {
      let endpoint = '';
      let payload = { name: newItem };
      
      switch (currentView) {
        case 'levels':
          endpoint = '/level';
          payload.countryId = id;
          break;
        case 'academic':
          endpoint = '/academic';
          payload.levelId = breadcrumb[breadcrumb.length - 1]?.id;
          break;
        case 'subjects':
          endpoint = '/subject';
          payload.academicLevelId = breadcrumb[breadcrumb.length - 1]?.id;
          payload.icon = selectedIcon; // Include the selected icon
          break;
        case 'titles':
          endpoint = '/title';
          payload.subjectId = breadcrumb[breadcrumb.length - 1]?.id;
          break;
        case 'folders':
          endpoint = '/folder';
          payload.titleId = breadcrumb[breadcrumb.length - 1]?.id;
          break;
      }
      
      const res = await axios.post(endpoint, payload);
      setCurrentData([...currentData, res.data]);
      setNewItem("");
      setSelectedIcon(""); // Reset selected icon
      toast.success("Item added successfully!");
    } catch (error) {
      toast.error(`Add failed: ${error.message}`);
    }
  };

  const handleEditItem = async (itemId, updatedName, updatedIcon = null) => {
    if (!updatedName.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }
    
    try {
      let endpoint = '';
      let payload = { name: updatedName };
      
      // Include icon in payload for subjects
      if (currentView === 'subjects' && updatedIcon !== null) {
        payload.icon = updatedIcon;
      }
      
      switch (currentView) {
        case 'levels':
          endpoint = `/level/${itemId}`;
          break;
        case 'academic':
          endpoint = `/academic/${itemId}`;
          break;
        case 'subjects':
          endpoint = `/subject/${itemId}`;
          break;
        case 'titles':
          endpoint = `/title/${itemId}`;
          break;
        case 'folders':
          endpoint = `/folder/${itemId}`;
          break;
      }
      
      await axios.put(endpoint, payload);
      setCurrentData(currentData.map(item => 
        item._id === itemId ? { ...item, ...payload } : item
      ));
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error(`Edit failed: ${error.message}`);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item and all its contents?")) return;
    
    try {
      let endpoint = '';
      
      switch (currentView) {
        case 'levels':
          endpoint = `/level/${itemId}`;
          break;
        case 'academic':
          endpoint = `/academic/${itemId}`;
          break;
        case 'subjects':
          endpoint = `/subject/${itemId}`;
          break;
        case 'titles':
          endpoint = `/title/${itemId}`;
          break;
        case 'folders':
          endpoint = `/folder/${itemId}`;
          break;
      }
      
      await axios.delete(endpoint);
      setCurrentData(currentData.filter(item => item._id !== itemId));
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error(`Delete failed: ${error.message}`);
    }
  };

  const handleFileUpload = async (folderId, file) => {
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const res = await axios.post(`/folder/upload/${folderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the folder with the new PDF
      setCurrentData(currentData.map(folder => 
        folder._id === folderId ? { 
          ...folder, 
          pdfList: [...(folder.pdfList || []), res.data] 
        } : folder
      ));
      
      toast.success("PDF uploaded successfully!");
    } catch (error) {
      toast.error(`PDF upload failed: ${error.message}`);
    }
  };

  const handleDeletePdf = async (folderId, pdfId) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;
    
    try {
      await axios.delete(`/folder/pdf/${folderId}/${pdfId}`);
      setCurrentData(currentData.map(folder => 
        folder._id === folderId ? { 
          ...folder, 
          pdfList: folder.pdfList.filter(pdf => pdf._id !== pdfId) 
        } : folder
      ));
      toast.success("PDF deleted successfully!");
    } catch (error) {
      toast.error(`PDF deletion failed: ${error.message}`);
    }
  };

  const handleIconSelect = (iconData) => {
    setSelectedIcon(iconData.name);
    setShowIconSelector(false);
  };

  const getSelectedIconComponent = () => {
    if (!selectedIcon) return null;
    const iconData = SUBJECT_ICONS.find(icon => icon.name === selectedIcon);
    return iconData ? iconData.icon : null;
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'levels': return 'Education Levels';
      case 'academic': return 'Academic Levels';
      case 'subjects': return 'Subjects';
      case 'titles': return 'Titles/Topics';
      case 'folders': return 'Folders & Files';
      default: return 'Items';
    }
  };

  const getViewIcon = () => {
    switch (currentView) {
      case 'levels': return <MdSchool className="text-lg" />;
      case 'academic': return <MdLibraryBooks className="text-lg" />;
      case 'subjects': return <MdBook className="text-lg" />;
      case 'titles': return <MdEdit className="text-lg" />;
      case 'folders': return <MdFolder className="text-lg" />;
      default: return <MdSchool className="text-lg" />;
    }
  };

  const getItemIcon = (item) => {
    // For subjects, use the stored icon if available
    if (currentView === 'subjects' && item.icon) {
      const iconData = SUBJECT_ICONS.find(icon => icon.name === item.icon);
      if (iconData) {
        const IconComponent = iconData.icon;
        return <IconComponent />;
      }
    }
    
    // Default icons for other views
    switch (currentView) {
      case 'levels': return <SiHtmlacademy />;
      case 'academic': return <HiOutlineAcademicCap />;
      case 'subjects': return <RiBookShelfLine />;
      case 'titles': return <PiSubtitlesLight />;
      case 'folders': return <FaRegFolderOpen />;
      default: return <FaRegFilePdf />;
    }
  };

  const canNavigateDeeper = () => {
    return currentView !== 'folders';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4335A7]"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#4335A7]">Educational Structure Management</h1>
          {country && (
            <div className="bg-[#4335A7] text-white px-4 py-2 rounded-lg">
              {country.name}
            </div>
          )}
        </div>

        {/* Country Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Country Information</h2>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <label htmlFor="country-name" className="block text-sm font-medium text-gray-700 mb-1">
                Country Name
              </label>
              <input
                id="country-name"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                placeholder="Enter country name"
              />
            </div>
            <button 
              onClick={handleUpdateCountry} 
              className="bg-[#4335A7] text-white px-6 py-2 rounded-lg hover:bg-[#372c94] flex items-center gap-2 transition-colors mt-6"
            >
              <MdSave /> Save Changes
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-[#4335A7] hover:text-[#372c94] font-medium"
              >
                <MdArrowBack /> Back
              </button>
              <span className="mx-2">•</span>
              <span>Country</span>
              {breadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className="mx-2">→</span>
                  <span>{crumb.name}</span>
                </React.Fragment>
              ))}
              <span className="mx-2">→</span>
              <span className="font-medium text-[#4335A7]">{getViewTitle()}</span>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {getViewIcon()}
              <h2 className="text-xl font-semibold text-gray-700">{getViewTitle()}</h2>
            </div>
            <div className="text-sm text-gray-500">
              {currentData.length} item{currentData.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Add New Item */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Add New {getViewTitle().slice(0, -1)}</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={`Enter ${getViewTitle().toLowerCase().slice(0, -1)} name`}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter to add</p>
              </div>
              
              {/* Icon selector for subjects */}
              {currentView === 'subjects' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowIconSelector(true)}
                    className="border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
                  >
                    {selectedIcon ? (
                      <>
                        {React.createElement(getSelectedIconComponent(), { size: 20 })}
                        <span className="text-sm">Change Icon</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">Select Icon</span>
                    )}
                  </button>
                </div>
              )}
              
              <button
                onClick={handleAddItem}
                className="bg-[#4335A7] text-white px-6 py-2 rounded-lg hover:bg-[#372c94] flex items-center gap-2 transition-colors"
              >
                <MdAdd /> Add
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {loadingData ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4335A7]"></div>
              </div>
            ) : currentData.length > 0 ? (
              currentData.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  currentView={currentView}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onNavigate={navigateTo}
                  onFileUpload={handleFileUpload}
                  onDeletePdf={handleDeletePdf}
                  canNavigateDeeper={canNavigateDeeper()}
                  getItemIcon={getItemIcon}
                />
              ))
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No {getViewTitle().toLowerCase()} found</p>
                <p className="text-sm text-gray-400 mt-2">Add your first {getViewTitle().toLowerCase().slice(0, -1)} above</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Icon Selector Modal */}
      {showIconSelector && (
        <SubjectIconSelector
          selectedIcon={selectedIcon}
          onIconSelect={handleIconSelect}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

const ItemCard = ({ item, currentView, onEdit, onDelete, onNavigate, onFileUpload, onDeletePdf, canNavigateDeeper, getItemIcon }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [itemIcon, setItemIcon] = useState(item.icon || "");

  const getNextView = () => {
    switch (currentView) {
      case 'levels': return 'academic';
      case 'academic': return 'subjects';
      case 'subjects': return 'titles';
      case 'titles': return 'folders';
      default: return null;
    }
  };

  const handleSave = () => {
    if (currentView === 'subjects') {
      onEdit(item._id, name, itemIcon);
    } else {
      onEdit(item._id, name);
    }
    setEditing(false);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploadingPdf(true);
    await onFileUpload(item._id, file);
    setUploadingPdf(false);
  };

  const handleIconSelect = (iconData) => {
    setItemIcon(iconData.name);
    setShowIconSelector(false);
  };

  const getSelectedIconComponent = () => {
    if (!itemIcon) return null;
    const iconData = SUBJECT_ICONS.find(icon => icon.name === itemIcon);
    return iconData ? iconData.icon : null;
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">{getItemIcon(item)}</span>
            {editing ? (
              <div className="flex-1 flex gap-2 items-center">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                {currentView === 'subjects' && (
                  <button
                    onClick={() => setShowIconSelector(true)}
                    className="border border-gray-300 rounded px-3 py-2 flex items-center gap-2 hover:bg-gray-50"
                  >
                    {itemIcon ? (
                      React.createElement(getSelectedIconComponent(), { size: 16 })
                    ) : (
                      <span className="text-sm">Icon</span>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                {currentView === 'folders' && item.pdfList && (
                  <p className="text-sm text-gray-500">{item.pdfList.length} PDF{item.pdfList.length !== 1 ? 's' : ''}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {editing ? (
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 p-2"
                title="Save"
              >
                <MdSave size={20} />
              </button>
            ) : (
              <button 
                onClick={() => setEditing(true)} 
                className="text-blue-600 hover:text-blue-800 p-2"
                title="Edit"
              >
                <MdEdit size={20} />
              </button>
            )}
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-600 hover:text-red-800 p-2"
              title="Delete"
            >
              <MdDelete size={20} />
            </button>
            {canNavigateDeeper && (
              <button
                onClick={() => onNavigate(getNextView(), item._id, item.name, currentView)}
                className="text-[#4335A7] hover:text-[#372c94] p-2 ml-2"
                title="Open"
              >
                <MdExpandMore size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Folder-specific content */}
        {currentView === 'folders' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {/* Upload Section */}
            <div className="mb-3">
              <label className="flex items-center gap-2 text-sm text-[#4335A7] cursor-pointer hover:text-[#372c94]">
                <MdAttachFile size={16} />
                <span>Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleUpload(e.target.files[0])}
                  className="hidden"
                  disabled={uploadingPdf}
                />
              </label>
              {uploadingPdf && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
            </div>

            {/* PDF List */}
            {item.pdfList && item.pdfList.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Files:</h4>
                {item.pdfList.map((pdf) => (
                  <div key={pdf._id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <a 
                      href={pdf.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm truncate flex items-center gap-2"
                      title={pdf.filename}
                    >
                      📄 {pdf.filename}
                    </a>
                    <button
                      onClick={() => onDeletePdf(item._id, pdf._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete PDF"
                    >
                      <MdDelete size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Icon Selector Modal for editing subjects */}
      {showIconSelector && currentView === 'subjects' && (
        <SubjectIconSelector
          selectedIcon={itemIcon}
          onIconSelect={handleIconSelect}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

export default AdminCountryManagement;