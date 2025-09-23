import React, { useState, useRef } from "react";
import { X, Upload, Video, Hash, AlignLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createFoodItem } from "../../services/videoService";

const CreateFood = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please upload a video");
      return;
    }

    setSelectedVideo(file);
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title || !description || selectedVideo == null) {
      toast.error("Please fill all the fields and upload a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", selectedVideo);

    try {
      setLoading(true);

      await createFoodItem(formData);
      toast.success("Food item created successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error(error.res?.data?.message || "Failed to create food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-gray-900">
              Create New Food Post
            </h1>
            <button
              onClick={() => navigate("/user/profile")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="ml-2 text-sm font-medium text-blue-600">
                  Details
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    ref={titleRef}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Title"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                  </div>
                  <textarea
                    name="description"
                    ref={descriptionRef}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe what makes your dish special..."
                  />
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <div className="flex items-center mb-2">
                  <Video className="w-5 h-5 text-blue-500 mr-2" />
                  <label className="text-sm font-medium text-gray-700">
                    Video
                  </label>
                </div>

                {!videoPreview ? (
                  <div
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                    onClick={() =>
                      document.getElementById("video-upload").click()
                    }
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <div className="mb-4">
                      <Upload className="w-12 h-12 text-blue-500 mx-auto" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Upload Your Food Video
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Showcase your dish in action
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• MP4 or WebM format</li>
                      <li>• Maximum duration: 30 seconds</li>
                      <li>• Maximum size: 50MB</li>
                    </ul>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={removeVideo}
                      className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
