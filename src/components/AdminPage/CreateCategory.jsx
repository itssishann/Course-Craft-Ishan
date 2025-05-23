import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { createCategory } from "../../services/operations/adminAPI";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
import { FiTag, FiEdit2, FiCheckCircle } from "react-icons/fi";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoadingCategories(true);
    const cats = await fetchCourseCategories();
    setLoadingCategories(false);

    if (cats) setCategories(cats);
    else toast.error("Failed to load categories");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    const success = await createCategory(name, description);
    setLoading(false);

    if (success) {
      toast.success("Category created successfully!");
      setName("");
      setDescription("");
      await loadCategories(); // Refresh categories list after creation
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      {/* Create Category Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <FiTag size={28} /> Create Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiEdit2 className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? (
            <>
              <FiCheckCircle className="animate-spin" size={20} />
              Creating...
            </>
          ) : (
            "Create Category"
          )}
        </button>
      </form>

      {/* Divider */}
      <hr className="my-10 border-gray-300" />

      {/* Categories List Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Existing Categories</h3>

        {loadingCategories ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {categories.map((cat) => (
              <li key={cat._id} className="p-3 border border-gray-300 rounded-md">
                <p className="font-semibold text-yellow-600">{cat.name}</p>
                {cat.description && <p className="text-gray-600 text-sm">{cat.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
    