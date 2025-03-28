"use client";
import { useState, useEffect } from "react";
import { ApiError } from "@/services/api/api";
import {
  SocialMediaData,
  InstructorNewApplicationData,
  SocialMediaType,
  AddApplicationModalProps,
} from "@/services/types";
import { addInstructorApplication } from "@/services/api/adminRequests";

const socialMediaOptions: SocialMediaType[] = [
  SocialMediaType.GITHUB,
  SocialMediaType.FACEBOOK,
  SocialMediaType.TWITTER,
  SocialMediaType.LINKEDIN,
  SocialMediaType.INSTAGRAM,
  SocialMediaType.TELEGRAM,
  SocialMediaType.YOUTUBE,
];

export default function AddApplicationModal({
  visible,
  onClose,
  userId,
}: AddApplicationModalProps) {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [specialization, setSpecialization] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [socialMedia, setSocialMedia] = useState<SocialMediaData[]>([]);
  const [socialName, setSocialName] = useState<SocialMediaType | "">("");
  const [socialLink, setSocialLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  const handleAddSocialMedia = () => {
    if (socialName && socialLink.trim()) {
      setSocialMedia([
        ...socialMedia,
        { name: socialName, link: socialLink.trim() },
      ]);
      setSocialName("");
      setSocialLink("");
    } else {
      setError("Please select a social media type and provide a valid link.");
    }
  };

  const handleRemoveSocialMedia = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !bio.trim() ||
      !specialization.trim() ||
      !age ||
      !firstName.trim() ||
      !lastName.trim() ||
      socialMedia.length === 0
    ) {
      setError("All fields are required.");
      return;
    }

    if (age < 18) {
      setError("Age must be at least 18.");
      return;
    }

    if (!userId) {
      setError("User ID is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const applicationData: InstructorNewApplicationData = {
        userId: parseInt(userId),
        title,
        bio,
        age,
        specialization,
        socialMedia,
        firstName,
        lastName,
      };

      await addInstructorApplication(applicationData);
      alert("Application submitted successfully!");
      setTitle("");
      setBio("");
      setAge("");
      setSpecialization("");
      setFirstName("");
      setLastName("");
      setSocialMedia([]);
      onClose();
    } catch (e) {
      if (e instanceof ApiError) {
        setError(`Error: ${e.message}`);
      } else {
        setError("An unexpected error occurred while submitting the application.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-gray-700 shadow-md p-6 rounded-lg w-full max-w-2xl">
        <h2 className="mb-4 font-bold text-xl">Add New Application</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-sm">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-sm">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-sm">Bio</label>
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Age</label>
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || "")}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Specialization</label>
              <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-sm">Social Media</label>
              <div className="flex md:flex-row flex-col gap-2">
                <select
                  value={socialName}
                  onChange={(e) => setSocialName(e.target.value as SocialMediaType)}
                  className="flex-grow bg-gray-800 p-2 rounded-lg text-white"
                >
                  <option value="">Select Social Media</option>
                  {socialMediaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Link"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="flex-grow bg-gray-800 p-2 rounded-lg text-white"
                />
                <button
                  type="button"
                  onClick={handleAddSocialMedia}
                  className="bg-blue-500 px-3 py-2 rounded-lg text-white"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {socialMedia.map((social, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-800 mt-1 p-2 rounded-lg"
                  >
                    <span>
                      {social.name} - {social.link}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialMedia(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 px-3 py-2 rounded-lg text-sm text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-2 text-sm rounded-lg ${
                loading ? "bg-gray-400" : "bg-blue-500 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}