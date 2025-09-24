import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  User,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";
import { getHomeFeed } from "../../services/videoService";
import { toast } from "react-toastify";

const Home = () => {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingStates, setPlayingStates] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getHomeFeed();
        if (response.data && Array.isArray(response.data.items)) {
          setVideosData(response.data.items);
          console.log(response.data.items);
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
    if (videoRefs.current[currentVideo]) {
      videoRefs.current[currentVideo].play();
      setPlayingStates((prev) => ({ ...prev, [currentVideo]: true }));
    }

    videoRefs.current.forEach((video, index) => {
      if (video && index != currentVideo) {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [index]: false }));
      }
    });
  }, [currentVideo]);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

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
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Video Container */}
      <div
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videosData.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full relative snap-start flex-shrink-0"
          >
            {/* Video Player */}
            <div className="absolute inset-0 bg-black">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-full object-cover"
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

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6">
              {/* Action Button (Reusable) */}
              {[
                { icon: Heart, count: video.likes },
                { icon: MessageCircle, count: video.comments },
                { icon: Share, count: video.shares },
              ].map(({ icon: Icon, count }, i) => (
                <div key={i} className="flex flex-col items-center">
                  <button
                    className="
                        bg-white/10 
                        hover:bg-white/20 
                        backdrop-blur-md 
                        rounded-full 
                        p-3
                        transition 
                        shadow-md 
                        hover:scale-110 
                        active:scale-95   
                      "
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-white text-sm mt-1 font-semibold">
                    {formatNumber(count)}
                  </span>
                </div>
              ))}

              {/* More Options */}
              <button
                className="
                bg-white/10 
                hover:bg-white/20 
                backdrop-blur-md 
                rounded-full 
                p-3
                transition 
                shadow-md 
                hover:scale-110 
                active:scale-95
                "
              >
                <MoreHorizontal className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-20 p-6">
              {/* Author Info */}
              <div className="flex items-center mb-3">
                <img
                  src={video.avatar}
                  alt={video.author}
                  className="w-12 h-12 rounded-full border-2 border-white mr-3"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {video.author}
                  </h3>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                  Follow
                </button>
              </div>

              {/* Video Title */}
              <h2 className="text-white text-xl font-bold mb-2">
                {video.title}
              </h2>

              {/* Description - Truncated to 2 lines */}
              <p className="text-white text-sm leading-5 opacity-90 line-clamp-2 overflow-hidden">
                {video.description}
              </p>

              {/* Visit Profile Button */}
              <button className="mt-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all flex items-center">
                <User className="w-4 h-4 mr-2" />
                Visit Profile
              </button>
            </div>

            {/* Video Progress Indicator */}
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <div className="flex flex-col space-y-2">
                {videosData.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-8 rounded-full transition-all ${
                      i === index ? "bg-white" : "bg-white bg-opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Foody Tiktok</h1>
          <button className="text-white p-2">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
