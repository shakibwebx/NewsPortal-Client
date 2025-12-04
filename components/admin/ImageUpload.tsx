'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default');

    try {
      console.log('Uploading to Cloudinary...');
      console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log('Cloudinary response:', data);

      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      return data.secure_url;
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10000000) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      onChange(imageUrl);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`Failed to upload image: ${error.message || 'Please try again.'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10000000) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      onChange(imageUrl);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`Failed to upload image: ${error.message || 'Please try again.'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!value ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative group cursor-pointer transition-all ${
            uploading ? 'opacity-50 cursor-wait' : ''
          } ${dragActive ? 'border-[#D00614] bg-red-50' : ''}`}
        >
          <div className={`w-full aspect-video max-w-2xl rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center p-8 ${
            dragActive
              ? 'border-[#D00614] bg-gradient-to-br from-red-50 to-orange-50'
              : 'border-gray-300 hover:border-[#D00614] bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-orange-50'
          }`}>
            {uploading ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <svg className="animate-spin text-[#D00614]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Uploading...</p>
                <p className="text-xs text-gray-500 mt-1">Please wait</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-4 text-gray-400 group-hover:text-[#D00614] transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-1 group-hover:text-[#D00614] transition-colors">
                  {dragActive ? 'Drop image here' : 'Click to upload image'}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  or drag and drop
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="px-3 py-1 bg-white rounded-full border border-gray-200">JPG, PNG, GIF, WEBP</span>
                  <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Max 10MB</span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Preview with overlay */}
          <div className="relative group w-full aspect-video max-w-2xl rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Change
                  </button>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={onRemove}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition shadow-lg flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Image Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Image uploaded successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}
