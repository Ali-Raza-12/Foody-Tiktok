import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  User,
  MoreHorizontal,
  Bookmark,
  BookOpen,
  Camera,
} from "lucide-react";
import { getHomeFeed } from "../../services/videoService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getHomeFeed();
        if (response.data && Array.isArray(response.data.items)) {
          setVideosData(response.data.items);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        toast.error(`Error fetching videos: ${error.message}`);
        setVideosData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    // Auto-play the current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentVideo) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentVideo]);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newCurrentVideo = Math.floor(scrollTop / containerHeight);

    if (
      newCurrentVideo !== currentVideo &&
      newCurrentVideo < videosData.length
    ) {
      setCurrentVideo(newCurrentVideo);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center app-bg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[rgba(255,183,77,0.14)] flex items-center justify-center mb-4">
            <Camera className="w-6 h-6 text-[rgb(var(--brand))]" />
          </div>
          <div className="text-lg font-semibold">Loading the feed</div>
          <div className="text-sm text-muted mt-2">
            Hang tight — fresh recipes incoming
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen app-bg overflow-hidden relative safe-area">
      {/* Video Container */}
      <div
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videosData.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full relative snap-start flex-shrink-0 video-screen"
          >
            {/* Video Player */}
            <div className="absolute inset-0 bg-black">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-full object-contain"
                loop
                autoPlay
                muted
                playsInline
              >
                <source src={video.videoUrl} type="video/mp4" />
              </video>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Right Side Actions (Production-like) */}
            <div className="action-sidebar">
              <div className="action-btn" role="button" aria-label="like">
                <Heart className="w-6 h-6 text-[rgb(var(--brand))]" />
                <div className="action-count">{formatNumber(video.likes)}</div>
              </div>

              <div className="action-btn" role="button" aria-label="comment">
                <MessageCircle className="w-6 h-6 text-white" />
                <div className="action-count">
                  {formatNumber(video.comments)}
                </div>
              </div>

              <div className="action-btn" role="button" aria-label="share">
                <Share className="w-6 h-6 text-white" />
                <div className="action-count">{formatNumber(video.shares)}</div>
              </div>

              <div className="action-btn" role="button" aria-label="save">
                <Bookmark className="w-6 h-6 text-white" />
              </div>

              <div className="action-btn" role="button" aria-label="recipe">
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              <div className="">
                <button onClick={() => navigate("/user/profile")}>
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Bottom-left metadata and overlays */}
            <div className="video-meta">
              <div className="flex items-center mb-2">
                <img
                  src={video.author.avatar}
                  alt={video.author.fullName}
                  className="w-10 h-10 rounded-full border-2 border-white mr-3 object-cover"
                />
                <div>
                  <div className="username text-white">
                    @{video.author.fullName}
                  </div>
                  <div className="text-sm text-[rgba(255,255,255,0.85)]">
                    {video.author.followers} followers
                  </div>
                </div>
                <div className="ml-4">
                  {user &&
                  (video.author?._id === user._id ||
                    video.author?.id === user.id) ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold cursor-not-allowed"
                    >
                      You
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-[rgb(var(--brand))] text-white rounded-full text-sm font-semibold">
                      Follow
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <div className="caption text-white font-poppins">
                  {video.title}
                </div>
                <div className="caption text-[rgba(255,255,255,0.9)] mt-2">
                  {video.description}
                </div>
                <div className="hashtags">
                  #{(video.tags || []).slice(0, 3).join("  #")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Navigation */}
      <div className="top-bar">
        <div className="w-[100%] flex items-center gap-4">
          <div className="w-[45%] brand-text text-white text-2xl">FoodHub</div>
          <div className="tab active">For You</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
