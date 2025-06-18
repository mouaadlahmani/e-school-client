import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import BlogCard from "../../components/BlogCard";
import EditArticlePage from "./EditArticle";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AddArticle from "./AddArticle";
import { CiCirclePlus } from "react-icons/ci";

const BASE_URL = "https://gomyclassapi.site"

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteArticle, setDeleteArticle] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/articles");

      // Handle different API response formats
      if (Array.isArray(res.data)) {
        setArticles(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        // Handle response format: {success: true, data: Array, pagination: {...}}
        setArticles(res.data.data);
      } else if (res.data && Array.isArray(res.data.articles)) {
        setArticles(res.data.articles);
      } else {
        setArticles([]);
        console.warn("API response is not in expected format:", res.data);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Please try again.");
      setArticles([]); // Ensure articles is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    console.log("Editing article:", article); // Debug log
    setEditingArticle(article);
  };

  const handleDelete = (article) => {
    setDeleteArticle(article);
    setShowDelete(true);
  };

  const handleSave = async (updated) => {
    try {
      let slug = updated.slug || updated.title?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim() || updated._id || updated.id;

      if (!slug) throw new Error("Cannot determine article identifier (slug, _id, or id)");

      const formData = new FormData();

      // Append form fields
      Object.entries(updated).forEach(([key, value]) => {
        if (key !== "thumbnailFile") {
          formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
        }
      });

      if (updated.thumbnailFile) {
        formData.append("thumbnail", updated.thumbnailFile);
      }

      await axios.put(`/articles/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingArticle(null);
      fetchArticles();
    } catch (err) {
      console.error("Error saving article:", err);
      alert("Failed to save article. Please try again.");
    }
  };

  const handleCreate = async (newArticle) => {
    try {
      const formData = new FormData();

      // Append form fields
      Object.entries(newArticle).forEach(([key, value]) => {
        if (key !== "thumbnailFile") {
          formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
        }
      });

      if (newArticle.thumbnailFile) {
        formData.append("thumbnail", newArticle.thumbnailFile);
      }

      await axios.post(`/articles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowAddArticle(false);
      fetchArticles();
    } catch (err) {
      console.error("Error creating article:", err);
      alert("Failed to create article. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      console.log("Deleting article:", deleteArticle); // Debug log

      // Check for slug first, then generate from title or use _id/_id
      let slug = deleteArticle.slug;
      if (!slug && deleteArticle.title) {
        slug = deleteArticle.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
      }

      if (!slug) {
        slug = deleteArticle._id || deleteArticle.id;
      }

      if (!slug) {
        throw new Error("Cannot determine article identifier (slug, _id, or id)");
      }

      await axios.delete(`/articles/${slug}`);
      setShowDelete(false);
      setDeleteArticle(null);
      fetchArticles();
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete article. Please try again.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (showAddArticle) {
    return (
      <>
        <Navbar />
        <AddArticle
          onCancel={() => setShowAddArticle(false)}
          onSave={handleCreate}
        />
        <Footer />
      </>
    );
  }

  if (editingArticle) {
    return (
      <>
        <Navbar />
        <EditArticlePage
          article={editingArticle}
          onSave={handleSave}
          onCancel={() => setEditingArticle(null)}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Articles</h1>
            <button
              onClick={() => setShowAddArticle(true)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-base font-medium shadow-md transition duration-200"
            >
              <CiCirclePlus className="text-2xl" />
              Ajouter
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading articles...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
              <button
                onClick={fetchArticles}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && Array.isArray(articles) && articles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl mb-4">No articles found</div>
              <p className="text-gray-400">Create your first article to get started!</p>
            </div>
          )}

          {!loading && !error && Array.isArray(articles) && articles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <BlogCard
                  key={article._id || article.id}
                  article={article}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        show={showDelete}
        onClose={() => {
          setShowDelete(false);
          setDeleteArticle(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteArticle?.title}"? This action cannot be undone.`}
      />
      <Footer />
    </>
  );
};

export default Blogs;