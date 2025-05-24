// ProfilePicSelector.jsx
import React, { useState, useRef } from 'react';
import { FiCamera, FiUser, FiUpload, FiX } from 'react-icons/fi';

const Profile = ({ 
  onImageSelect, 
  currentImage = null, 
  error = null,
  className = "",
  required = false 
}) => {
  const [preview, setPreview] = useState(currentImage);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreview(imageUrl);
        onImageSelect && onImageSelect(file, imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect && onImageSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`mb-7 ${className}`}>
     
      
      <div className="flex flex-col items-center">
        {/* Profile Picture Preview/Upload Area */}
        <div
          className={`relative w-32 h-32 rounded-full border-4 border-dashed transition-all duration-300 cursor-pointer group ${
            isDragOver 
              ? 'border-emerald-400 bg-emerald-50' 
              : preview 
                ? 'border-emerald-500 bg-white' 
                : error 
                  ? 'border-red-300 bg-red-50 hover:border-red-400' 
                  : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {preview ? (
            <>
              {/* Profile Image */}
              <img
                src={preview}
                alt="Profile preview"
                className="w-full h-full rounded-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <FiCamera className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">Change</span>
                </div>
              </div>
              
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200 shadow-lg"
              >
                <FiX className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Upload prompt */
            <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-emerald-500 transition-colors duration-300">
              <FiUser className="w-12 h-12 mb-2" />
              <div className="text-center px-2">
                <p className="text-xs font-medium">Click to upload</p>
                <p className="text-xs">or drag & drop</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Upload Instructions */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={openFileDialog}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
          >
            <FiUpload className="w-4 h-4 mr-2" />
            Choose Photo
          </button>
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG up to 5MB
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
        )}
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default Profile;