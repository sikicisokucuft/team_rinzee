import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, X, Loader2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl = 'https://files.catbox.moe/ust2lm.mp4',
  posterUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setIsPlaying(true);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Mute & retry if unmuted autoplay is blocked by browser policy
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
            }
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Video playback error:", err);
        setHasError(true);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[360px] md:max-w-[400px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-900">
            <Film size={16} className="text-slate-500 animate-pulse" />
            <span className="font-display text-xs md:text-sm tracking-wide font-semibold">VIP PREVIEW TRAILER</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Container (9:16 Vertical Aspect Ratio) */}
        <div 
          onClick={togglePlay}
          className="relative aspect-[9/16] w-full bg-white flex items-center justify-center cursor-pointer overflow-hidden select-none"
        >
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            muted={isMuted}
            playsInline
            loop
            onLoadStart={() => setIsLoading(true)}
            onWaiting={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            onPlay={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying && !isLoading ? 'opacity-100' : 'opacity-85'}`}
          />

          {/* Loading Spinner */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/60 backdrop-blur-[3px] z-20 pointer-events-none transition-all">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-[#0a0a0a] animate-spin" />
                <Loader2 size={28} className="absolute text-slate-900 animate-spin" />
              </div>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-900 animate-pulse drop-shadow">
                Loading Trailer...
              </span>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 text-slate-800">
                <Sparkles size={28} className="animate-bounce" />
              </div>
              <h4 className="text-slate-900 font-display text-lg mb-1">VIP Content Preview</h4>
              <p className="text-slate-500 text-xs max-w-md mb-4 leading-relaxed">
                Unable to load preview video stream.
              </p>
            </div>
          )}

          {!isPlaying && !isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/40 backdrop-blur-[2px] transition-all group-hover:bg-slate-900/20 z-10">
              <button 
                onClick={togglePlay}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 border border-slate-200 text-slate-900 flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group/btn"
                aria-label="Play video"
              >
                <Play size={32} className="ml-1 fill-current group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          )}

          {!hasError && (
            <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between z-20 text-slate-900">
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-900 transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX size={18} className="text-[#f87171]" />
                      <span className="text-[10px] bg-[#333] text-[#f87171] px-1.5 py-0.5 rounded">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={18} className="text-slate-900" />
                      <span className="text-[10px] bg-[#333] text-slate-900 px-1.5 py-0.5 rounded">Sound On</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-900 transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
