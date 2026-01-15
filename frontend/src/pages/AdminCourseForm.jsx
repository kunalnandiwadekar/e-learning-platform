import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminCourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    thumbnail: '',
    price: 0,
    category: 'Web Development',
    isPublished: false,
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Function to generate a default thumbnail with course initial
  const getDefaultThumbnail = (title) => {
    const initial = title ? title.charAt(0).toUpperCase() : 'C';
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return (
      <div 
        className="h-full w-full flex items-center justify-center text-white text-4xl font-bold rounded"
        style={{ backgroundColor: color }}
      >
        {initial}
      </div>
    );
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/admin/courses/${id}`);
          setFormData(response.data);
        } catch (err) {
          setError('Failed to load course data');
          console.error(err);
        }
      };
      fetchCourse();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      
      // Append all form data to FormData object
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // If there's a new thumbnail file, append it
      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      }

      // Set the content type to multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (isEditMode) {
        await api.put(`/admin/courses/${id}`, data, config);
      } else {
        await api.post('/admin/courses', data, config);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!thumbnailFile) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setPreviewUrl(objectUrl);

    // Free memory when this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Course' : 'Create New Course'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor">
                Instructor *
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Course Thumbnail
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0 h-32 w-48">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Thumbnail preview"
                      className="h-full w-full rounded object-cover border border-gray-200"
                    />
                  ) : formData.thumbnail ? (
                    <img
                      src={formData.thumbnail}
                      alt="Course thumbnail"
                      className="h-full w-full rounded object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-full w-full rounded border-2 border-dashed border-gray-300 overflow-hidden">
                      {getDefaultThumbnail(formData.title)}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                    <span>Change</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG, or GIF (max 2MB)
                  </p>
                  {thumbnailFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        document.querySelector('input[type="file"]').value = '';
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="pl-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
              Publish this course
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
