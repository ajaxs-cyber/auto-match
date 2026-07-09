import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const TRACKS = [
  {
    title: 'Autumn Breeze',
    artist: 'Whispering Woods',
    image: '/images/album-autumn-breeze.jpg',
    moods: ['Relaxing', 'Warm', 'Acoustic'],
  },
  {
    title: 'Sunday Morning',
    artist: 'Various Artists',
    image: '/images/album-sunday-morning.jpg',
    moods: ['Calm', 'Peaceful', 'Soft'],
  },
  {
    title: 'Urban Flow',
    artist: 'Chillhop Beats',
    image: '/images/album-urban-flow.jpg',
    moods: ['Lo-Fi', 'Urban', 'Chill'],
  },
];

const FEATURE_KEYS = ['ms.f1', 'ms.f2', 'ms.f3', 'ms.f4'];

export default function MusicShowcase() {
  const { lang, __ } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Simulate progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      ref={sectionRef}
      id="music"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{ zIndex: 1 }}
    >
      <div
        className={`liquid-glass max-w-[1000px] mx-auto rounded-3xl p-10 sm:p-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column */}
          <div
            className={`flex-1 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {__('ms.label')}
            </span>
            <h2
              className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {__('ms.title')}
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {__('ms.desc')}
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-4">
              {FEATURE_KEYS.map((featureKey) => (
                <div key={featureKey} className="flex items-center gap-3">
                  <CheckCircle
                    size={18}
                    style={{ color: 'var(--accent)', flexShrink: 0 }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {__(featureKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Music Player Mockup */}
          <div
            className={`flex-1 max-w-md mx-auto w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="card-surface overflow-hidden">
              {/* Header gradient */}
              <div
                className="h-32 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--music-accent), var(--accent))',
                }}
              >
                {/* Animated waveform bars */}
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-white/30"
                      style={{
                        height: `${8 + Math.sin(i * 0.8) * 16 + Math.cos(i * 1.2) * 8}px`,
                        animation: `waveform ${0.8 + Math.random() * 0.6}s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Player Body */}
              <div className="p-6">
                {/* Current Track */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={TRACKS[0].image}
                    alt={TRACKS[0].title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3
                      className="text-base font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {TRACKS[0].title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {TRACKS[0].artist}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {TRACKS[0].moods.map((mood) => (
                        <span
                          key={mood}
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'var(--music-accent-light)',
                            color: 'var(--music-accent)',
                          }}
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: 'rgba(26,43,60,0.08)' }}
                  >
                    <div
                      className="h-full rounded-full relative transition-all duration-100"
                      style={{
                        width: `${progress}%`,
                        background: 'var(--music-accent)',
                      }}
                    >
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md"
                        style={{ boxShadow: '0 0 6px rgba(123,97,255,0.5)' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      1:24
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      3:42
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    className="p-2 bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white border-none cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{ background: 'var(--music-accent)' }}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    className="p-2 bg-transparent border-none cursor-pointer transition-opacity hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <SkipForward size={20} />
                  </button>
                </div>

                {/* Track List */}
                <div className="mt-6 space-y-2">
                  {TRACKS.slice(1).map((track) => (
                    <div
                      key={track.title}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(26,43,60,0.03)]"
                    >
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {track.title}
                        </p>
                        <p
                          className="text-xs truncate"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          {track.artist}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {track.moods.slice(0, 2).map((mood) => (
                          <span
                            key={mood}
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: 'var(--music-accent-light)',
                              color: 'var(--music-accent)',
                            }}
                          >
                            {mood}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
