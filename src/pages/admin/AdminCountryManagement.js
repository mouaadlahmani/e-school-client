import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "../../components/navbar";
import { MdEdit, MdDelete, MdSave, MdAdd, MdExpandMore, MdExpandLess, MdAttachFile, MdFolder, MdBook, MdLibraryBooks, MdSchool, MdArrowBack, MdSearch, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiHtmlacademy } from "react-icons/si";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiBookShelfLine } from "react-icons/ri";
import { PiSubtitlesLight } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { SubjectIconSelector, SUBJECT_ICONS } from "./SubjectIconSelector"; 


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
  
  // Enhanced UX state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

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
      setSearchTerm(""); // Reset search when navigating
      
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
    setSearchTerm(""); // Reset search when going back
  };

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast.warning("Please enter a name");
      return;
    }
    
    // Require icon selection for all levels
    if (!selectedIcon) {
      toast.warning("Please select an icon");
      return;
    }
    
    try {
      let endpoint = '';
      let payload = { name: newItem, icon: selectedIcon };
      
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
      setSelectedIcon("");
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
      
      // Include icon in payload for all levels
      if (updatedIcon !== null) {
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
    // Use stored icon if available
    if (item.icon) {
      const iconData = SUBJECT_ICONS.find(icon => icon.name === item.icon);
      if (iconData) {
        const IconComponent = iconData.icon;
        return <IconComponent />;
      }
    }
    
    // Default icons for backward compatibility
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

  // Filter and sort data
  const getFilteredAndSortedData = () => {
    let filtered = currentData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.createdAt || 0) + new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });
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

  const filteredData = getFilteredAndSortedData();

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#4335A7]">Educational Structure Management</h1>
          {country && (
            <div className="bg-[#4335A7] text-white px-4 py-2 rounded-lg font-medium">
              {country.name}
            </div>
          )}
        </div>

        {/* Country Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MdEdit className="text-[#4335A7]" />
            Country Information
          </h2>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label htmlFor="country-name" className="block text-sm font-medium text-gray-700 mb-2">
                Country Name
              </label>
              <input
                id="country-name"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4335A7] focus:border-[#4335A7] transition-all"
                placeholder="Enter country name"
              />
            </div>
            <button 
              onClick={handleUpdateCountry} 
              className="bg-[#4335A7] text-white px-6 py-3 rounded-lg hover:bg-[#372c94] flex items-center gap-2 transition-all transform hover:scale-105 font-medium"
            >
              <MdSave /> Save Changes
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-[#4335A7] hover:text-[#372c94] font-medium bg-[#4335A7]/10 px-3 py-1 rounded-lg hover:bg-[#4335A7]/20 transition-all"
                >
                  <MdArrowBack /> Back
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Country</span>
                  {breadcrumb.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <span className="text-gray-400">→</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{crumb.name}</span>
                    </React.Fragment>
                  ))}
                  <span className="text-gray-400">→</span>
                  <span className="font-medium text-[#4335A7] bg-[#4335A7]/10 px-2 py-1 rounded">{getViewTitle()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Header with Controls */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                {getViewIcon()}
                <h2 className="text-2xl font-semibold text-gray-700">{getViewTitle()}</h2>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {filteredData.length} item{filteredData.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335A7] w-full sm:w-64"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>
            </div>

            {/* Add New Item */}
            <div className="p-4 bg-gradient-to-r from-[#4335A7]/5 to-blue-50 rounded-lg border border-dashed border-[#4335A7]/30">
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                <MdAdd className="text-[#4335A7]" />
                Add New {getViewTitle().slice(0, -1)}
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={`Enter ${getViewTitle().toLowerCase().slice(0, -1)} name`}
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#4335A7] focus:border-[#4335A7] transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  />
                </div>
                
                {/* Icon selector for all levels */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowIconSelector(true)}
                    className="border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-2 hover:bg-gray-50 transition-all min-w-[120px] justify-center"
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
                  
                  <button
                    onClick={handleAddItem}
                    className="bg-[#4335A7] text-white px-6 py-3 rounded-lg hover:bg-[#372c94] flex items-center gap-2 transition-all transform hover:scale-105 font-medium"
                  >
                    <MdAdd /> Add
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Press Enter to add quickly, or click Add button</p>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6">
            {loadingData ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4335A7]"></div>
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((item) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-gray-400 text-4xl mb-4">📚</div>
                <p className="text-gray-500 text-lg">No {getViewTitle().toLowerCase()} found</p>
                {searchTerm ? (
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your search term "{searchTerm}"
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">
                    Add your first {getViewTitle().toLowerCase().slice(0, -1)} above
                  </p>
                )}
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
          context={currentView}
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
  const [expandedPdfs, setExpandedPdfs] = useState(false);

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
    onEdit(item._id, name, itemIcon);
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-all duration-200 hover:border-[#4335A7]/30">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl text-[#4335A7] bg-[#4335A7]/10 p-2 rounded-lg">
              {getItemIcon(item)}
            </div>
            {editing ? (
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4335A7] font-medium"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                <button
                  onClick={() => setShowIconSelector(true)}
                  className="border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-50 text-sm self-start"
                >
                  {itemIcon ? (
                    <>
                      {React.createElement(getSelectedIconComponent(), { size: 16 })}
                      <span>Change Icon</span>
                    </>
                  ) : (
                    <span>Select Icon</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                {currentView === 'folders' && item.pdfList && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaRegFilePdf />
                    {item.pdfList.length} PDF{item.pdfList.length !== 1 ? 's' : ''}
                  </p>
                )}
                {item.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {formatDate(item.createdAt)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {editing ? (
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-all"
                title="Save changes"
              >
                <MdSave size={18} />
              </button>
            ) : (
              <button 
                onClick={() => setEditing(true)} 
                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all"
                title="Edit item"
              >
                <MdEdit size={18} />
              </button>
            )}
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
              title="Delete item"
            >
              <MdDelete size={18} />
            </button>
            {canNavigateDeeper && (
              <button
                onClick={() => onNavigate(getNextView(), item._id, item.name, currentView)}
                className="text-[#4335A7] hover:text-[#372c94] p-2 hover:bg-[#4335A7]/10 rounded-lg transition-all ml-1"
                title="Open and explore"
              >
                <MdExpandMore size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Folder-specific content */}
        {currentView === 'folders' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Upload Section */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-[#4335A7] cursor-pointer hover:text-[#372c94] bg-[#4335A7]/10 px-3 py-2 rounded-lg transition-all hover:bg-[#4335A7]/20 w-fit">
                <MdAttachFile size={16} />
                <span className="font-medium">Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleUpload(e.target.files[0])}
                  className="hidden"
                  disabled={uploadingPdf}
                />
              </label>
              {uploadingPdf && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#4335A7]"></div>
                  <span>Uploading...</span>
                </div>
              )}
            </div>

            {/* PDF List */}
            {item.pdfList && item.pdfList.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FaRegFilePdf className="text-red-500" />
                    PDF Files ({item.pdfList.length})
                  </h4>
                  <button
                    onClick={() => setExpandedPdfs(!expandedPdfs)}
                    className="text-[#4335A7] hover:text-[#372c94] p-1 rounded transition-all"
                    title={expandedPdfs ? "Collapse" : "Expand"}
                  >
                    {expandedPdfs ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
                  </button>
                </div>
                
                {expandedPdfs && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {item.pdfList.map((pdf) => (
                      <div
                        key={pdf._id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <FaRegFilePdf className="text-red-500 flex-shrink-0" size={14} />
                            <span className="text-sm font-medium text-gray-700 truncate">
                              {pdf.originalName || pdf.filename || 'Unnamed PDF'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            {pdf.size && (
                              <span>{formatFileSize(pdf.size)}</span>
                            )}
                            {pdf.uploadedAt && (
                              <span>Uploaded: {formatDate(pdf.uploadedAt)}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {pdf.url && (
                            <a
                              href={pdf.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-all"
                              title="View PDF"
                            >
                              <MdExpandMore size={14} />
                            </a>
                          )}
                          <button
                            onClick={() => onDeletePdf(item._id, pdf._id)}
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-all"
                            title="Delete PDF"
                          >
                            <MdDelete size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!expandedPdfs && item.pdfList.length > 0 && (
                  <div className="text-xs text-gray-500 pl-2">
                    Click to view {item.pdfList.length} file{item.pdfList.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            )}

            {/* Empty state for folders with no PDFs */}
            {(!item.pdfList || item.pdfList.length === 0) && (
              <div className="text-center py-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <FaRegFilePdf className="mx-auto text-gray-400 text-2xl mb-2" />
                <p className="text-sm text-gray-500">No PDFs uploaded yet</p>
                <p className="text-xs text-gray-400 mt-1">Use the upload button above to add files</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Icon Selector Modal for Individual Items */}
      {showIconSelector && (
        <SubjectIconSelector
          selectedIcon={itemIcon}
          onIconSelect={handleIconSelect}
          onClose={() => setShowIconSelector(false)}
          context={currentView}
        />
      )}
    </>
  );
};

export default AdminCountryManagement;