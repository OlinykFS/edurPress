"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadAvatar } from "@/services/api/apiRequests";

interface AvatarUploaderProps {
  onClose: () => void;
  onAvatarUploaded: (newAvatarUrl: string) => void;
  visible: boolean;
  currentAvatar: string;
  userId: number;
}

export default function AvatarUploader({
  onClose,
  onAvatarUploaded,
  visible,
  userId,
}: AvatarUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const newAvatarUrl = await uploadAvatar(selectedFile, userId);
      onAvatarUploaded(newAvatarUrl);
      onClose();
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative transform transition-all duration-300 scale-95 animate-modalIn">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
          Upload New Avatar
        </h2>

        <label
          htmlFor="file-upload"
          className="block w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          {selectedFile ? "Change File" : "Choose an Image"}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {previewUrl && (
          <div className="mt-4 flex justify-center">
            <Image
              src={previewUrl}
              alt="Preview"
              className="rounded-full object-cover"
              width={120}
              height={120}
            />
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : "Confirm"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
