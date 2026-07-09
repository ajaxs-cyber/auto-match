import type { MusicTrack, BrandMoodProfile, MusicRecommendation } from '@/types';

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-1', title: 'Autumn Breeze', artist: 'Whispering Woods',
    album: 'Seasonal Sounds', duration: '3:42', cover: '/images/album-autumn-breeze.jpg',
    moods: ['Relaxing', 'Warm', 'Acoustic'], genre: 'Acoustic', bpm: 85,
    reason: 'Warm acoustic tones create an intimate, welcoming atmosphere perfect for artisanal brands',
  },
  {
    id: 'track-2', title: 'Sunday Morning', artist: 'Soft Horizon',
    album: 'Weekend Vibes', duration: '4:15', cover: '/images/album-sunday-morning.jpg',
    moods: ['Calm', 'Peaceful', 'Soft'], genre: 'Ambient', bpm: 72,
    reason: 'Gentle ambient textures provide a calm, professional backdrop without distraction',
  },
  {
    id: 'track-3', title: 'Urban Flow', artist: 'Chillhop Beats',
    album: 'City Nights', duration: '3:28', cover: '/images/album-urban-flow.jpg',
    moods: ['Lo-Fi', 'Urban', 'Chill'], genre: 'Lo-Fi', bpm: 90,
    reason: 'Modern lo-fi beats convey creativity and forward-thinking energy for tech brands',
  },
  {
    id: 'track-4', title: 'Morning Brew', artist: 'Cafe Acoustics',
    album: 'Coffee Shop Sessions', duration: '3:55', cover: '/images/album-autumn-breeze.jpg',
    moods: ['Cozy', 'Warm', 'Inviting'], genre: 'Jazz', bpm: 78,
    reason: 'Smooth jazz brings sophistication and warmth to hospitality and food brands',
  },
  {
    id: 'track-5', title: 'Digital Dreams', artist: 'Neon Pulse',
    album: 'Future Forward', duration: '4:02', cover: '/images/album-urban-flow.jpg',
    moods: ['Modern', 'Energetic', 'Tech'], genre: 'Electronic', bpm: 120,
    reason: 'Energetic electronic pulses drive engagement for innovative, dynamic brands',
  },
  {
    id: 'track-6', title: 'Zen Garden', artist: 'Tranquil Tones',
    album: 'Mindful Moments', duration: '5:10', cover: '/images/album-sunday-morning.jpg',
    moods: ['Serene', 'Meditative', 'Balanced'], genre: 'New Age', bpm: 65,
    reason: 'Serene new-age tones evoke balance and trust, ideal for wellness and health brands',
  },
];

export const INDUSTRY_MUSIC_MAP: Record<string, string[]> = {
  'Coffee & Food': ['track-1', 'track-4', 'track-2'],
  'Creative': ['track-2', 'track-1', 'track-6'],
  'Tech': ['track-5', 'track-3', 'track-6'],
  'Health': ['track-6', 'track-2', 'track-1'],
  'Services': ['track-1', 'track-4', 'track-2'],
  'Retail': ['track-3', 'track-5', 'track-1'],
  'Education': ['track-2', 'track-6', 'track-4'],
  'Entertainment': ['track-5', 'track-3', 'track-1'],
};

export const GENRE_LABELS: Record<string, { label: string; color: string }> = {
  'Acoustic': { label: 'Acoustic Folk', color: '#D4A574' },
  'Ambient': { label: 'Ambient Chill', color: '#7B9EA8' },
  'Lo-Fi': { label: 'Lo-Fi Beats', color: '#8B7EC8' },
  'Jazz': { label: 'Smooth Jazz', color: '#C17F59' },
  'Electronic': { label: 'Electronic', color: '#3B82F6' },
  'New Age': { label: 'New Age', color: '#4ADE80' },
};

export function getRecommendedTracks(industry: string): MusicTrack[] {
  const trackIds = INDUSTRY_MUSIC_MAP[industry] || INDUSTRY_MUSIC_MAP['Services'];
  return trackIds.map(id => MUSIC_TRACKS.find(t => t.id === id)!).filter(Boolean);
}

export function getTrackById(id: string): MusicTrack | undefined {
  return MUSIC_TRACKS.find(t => t.id === id);
}

export function generateBrandMoodProfile(industry: string): BrandMoodProfile {
  const profiles: Record<string, BrandMoodProfile> = {
    'Coffee & Food': { warmth: 90, energy: 45, professionalism: 60, creativity: 55, sophistication: 70 },
    'Creative': { warmth: 50, energy: 75, professionalism: 40, creativity: 95, sophistication: 65 },
    'Tech': { warmth: 30, energy: 80, professionalism: 90, creativity: 75, sophistication: 60 },
    'Health': { warmth: 70, energy: 65, professionalism: 80, creativity: 40, sophistication: 55 },
    'Services': { warmth: 60, energy: 55, professionalism: 85, creativity: 45, sophistication: 65 },
  };
  return profiles[industry] || { warmth: 50, energy: 60, professionalism: 70, creativity: 50, sophistication: 55 };
}

export function generateMusicRecommendation(industry: string): MusicRecommendation {
  const tracks = getRecommendedTracks(industry);
  const moodProfile = generateBrandMoodProfile(industry);
  const primary = tracks[0];
  const alternatives = tracks.slice(1);

  const reasonings: Record<string, string> = {
    'Coffee & Food': `Your warm, artisanal brand aesthetic with earth tones creates an intimate atmosphere. ${primary.genre} music with its organic warmth naturally complements the sensory experience of food and craft.`,
    'Creative': `Your bold, expressive brand identity calls for music that mirrors creative energy. ${primary.genre} provides an inspiring soundscape that enhances artistic expression without competing for attention.`,
    'Tech': `Your modern, forward-thinking brand benefits from ${primary.genre.toLowerCase()}'s progressive energy. The clean, structured sound reinforces innovation while maintaining professional credibility.`,
    'Health': `Your wellness-focused brand requires music that promotes calm and trust. ${primary.genre}'s serene qualities create a therapeutic environment that aligns with holistic health values.`,
    'Services': `Your professional service brand needs music that builds confidence. ${primary.genre} provides a polished, reliable audio identity that complements your expertise.`,
  };

  return {
    primary,
    alternatives,
    reasoning: reasonings[industry] || `Your brand profile suggests ${primary.genre} as the ideal soundscape. The ${primary.moods.join(', ')} qualities align with your brand's emotional goals.`,
    moodProfile,
  };
}

export function getGenreLabel(genre: string): string {
  return GENRE_LABELS[genre]?.label || genre;
}

export function getGenreColor(genre: string): string {
  return GENRE_LABELS[genre]?.color || '#888';
}
