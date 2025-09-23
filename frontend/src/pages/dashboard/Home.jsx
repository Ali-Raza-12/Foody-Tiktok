import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, User, MoreHorizontal, Play, Pause } from 'lucide-react';
import { getHomeFeed } from '../../services/videoService';

const Home = () => {

  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingStates, setPlayingStates] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
       const response = await getHomeFeed();
       console.log("123", response.data.Items);
       setVideosData(response.data.Items);
       setLoading(false);

      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // Sample video data
  // const videos = [
  //   {
  //     id: 1,
  //     videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  //     title: "Delicious Pasta Carbonara Recipe",
  //     description: "Learn how to make authentic Italian carbonara with creamy sauce and crispy pancetta. Perfect for dinner!",
  //     author: "Chef Marco",
  //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  //     likes: 1234,
  //     comments: 89,
  //     shares: 45
  //   },
  //   {
  //     id: 2,
  //     videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
  //     title: "Japanese Ramen Bowl",
  //     description: "Step by step guide to making rich and flavorful tonkotsu ramen at home with perfect soft-boiled eggs",
  //     author: "Sushi Master",
  //     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
  //     likes: 2156,
  //     comments: 234,
  //     shares: 78
  //   },
  //   {
  //     id: 3,
  //     videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
  //     title: "Perfect Chocolate Cake",
  //     description: "Moist and decadent chocolate cake recipe that will impress everyone. Secret ingredient revealed!",
  //     author: "Baker Sarah",
  //     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  //     likes: 3456,
  //     comments: 167,
  //     shares: 123
  //   },
  //   {
  //     id: 4,
  //     videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  //     title: "Healthy Buddha Bowl",
  //     description: "Nutritious and colorful buddha bowl packed with quinoa, roasted vegetables and tahini dressing",
  //     author: "Wellness Chef",
  //     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  //     likes: 987,
  //     comments: 56,
  //     shares: 34
  //   }
  // ];

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newCurrentVideo = Math.round(scrollTop / containerHeight);
    
    if (newCurrentVideo !== currentVideo && newCurrentVideo < videos.length) {
      setCurrentVideo(newCurrentVideo);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
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
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Video Container */}
      <div 
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videosData.map((video, index) => (
          <div key={video.id} className="h-screen w-full relative snap-start flex-shrink-0">
            {/* Video Player */}
            <div className="absolute inset-0 bg-black">
              <video
                ref={el => videoRefs.current[index] = el}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster={`https://images.unsplash.com/photo-${1565299624946 + index}-1d968694-a6a6?w=400&h=700&fit=crop`}
              >
                <source src={video.videoUrl} type="video/mp4" />
              </video>
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => togglePlay(index)}
              >
                {!playingStates[index] && (
                  <div className="bg-black bg-opacity-50 rounded-full p-4">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                )}
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col space-y-6">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
                  <Heart className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-sm mt-1 font-medium">{formatNumber(video.likes)}</span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center">
                <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-sm mt-1 font-medium">{formatNumber(video.comments)}</span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center">
                <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
                  <Share className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-sm mt-1 font-medium">{formatNumber(video.shares)}</span>
              </div>

              {/* More Options */}
              <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
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
                  <h3 className="text-white font-semibold text-lg">{video.author}</h3>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                  Follow
                </button>
              </div>

              {/* Video Title */}
              <h2 className="text-white text-xl font-bold mb-2">{video.title}</h2>

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
                      i === index ? 'bg-white' : 'bg-white bg-opacity-30'
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
          <h1 className="text-white text-2xl font-bold">FoodHub</h1>
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