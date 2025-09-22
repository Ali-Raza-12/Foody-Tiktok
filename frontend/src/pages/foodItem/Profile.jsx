import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Settings,
  Share,
  Plus,
  Play,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/profileService";
import { toast } from "react-toastify";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [profileData, setProfileData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        setProfileData(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load profile data"
        );
      }
    };

    fetchUserData();
  }, []);

  // Sample videos
  const userVideos = [
    {
      id: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=400&fit=crop",
      views: "1.2M",
      duration: "0:45",
      title: "Perfect Pasta Carbonara",
    },
    {
      id: 2,
      thumbnail:
        "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=400&fit=crop",
      views: "890K",
      duration: "1:20",
      title: "Homemade Pizza Margherita",
    },
    {
      id: 3,
      thumbnail:
        "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=400&fit=crop",
      views: "2.1M",
      duration: "0:38",
      title: "Creamy Risotto Recipe",
    },
    {
      id: 4,
      thumbnail:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=400&fit=crop",
      views: "657K",
      duration: "1:05",
      title: "Fresh Bruschetta",
    },
    {
      id: 5,
      thumbnail:
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=400&fit=crop",
      views: "1.8M",
      duration: "0:52",
      title: "Tiramisu Dessert",
    },
    {
      id: 6,
      thumbnail:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=400&fit=crop",
      views: "934K",
      duration: "1:15",
      title: "Seafood Linguine",
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {profileData.fullName}
            </h1>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white pb-6">
        <div className="px-6 pt-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              {profileData.verified && (
                <div className="absolute -bottom-1 right-2 bg-blue-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.fullName}
              </h2>
              <p className="text-gray-600 mb-3">@{profileData.fullName}</p>

              {/* Stats */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {formatNumber(profileData.followers)}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {formatNumber(profileData.following)}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {formatNumber(profileData.likes)}
                  </div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profileData.bio ? (
            <p className="text-gray-700 mb-4 leading-5">{profileData.bio}</p>
          ) : (
            <p className="text-gray-700 mb-4 leading-5">Set Your Bio</p>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
              <Edit className="w-4 h-4 inline mr-2" />
              Edit Profile
            </button>
            <button onClick={() => navigate("/createFood")} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Post Video
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-6">
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "videos"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "liked"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Liked
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="px-4 py-4">
        {activeTab === "videos" && (
          <div className="grid grid-cols-3 gap-1">
            {userVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <Play
                      className="w-6 h-6 text-gray-800"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white text-xs">
                      <Play className="w-3 h-3 mr-1" fill="white" />
                      {video.views}
                    </div>
                    <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "liked" && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No liked videos yet
            </h3>
            <p className="text-gray-600">Videos you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
