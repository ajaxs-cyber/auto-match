import type { MusicTrack } from '@/types';

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'Autumn Breeze',
    artist: 'Whispering Woods',
    album: 'Seasonal Sounds',
    duration: '3:42',
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Relaxing', 'Warm', 'Acoustic'],
    genre: 'Acoustic',
    bpm: 85,
  },
  {
    id: 'track-2',
    title: 'Sunday Morning',
    artist: 'Soft Horizon',
    album: 'Weekend Vibes',
    duration: '4:15',
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Calm', 'Peaceful', 'Soft'],
    genre: 'Ambient',
    bpm: 72,
  },
  {
    id: 'track-3',
    title: 'Urban Flow',
    artist: 'Chillhop Beats',
    album: 'City Nights',
    duration: '3:28',
    cover: '/images/album-urban-flow.jpg',
    moods: ['Lo-Fi', 'Urban', 'Chill'],
    genre: 'Lo-Fi',
    bpm: 90,
  },
  {
    id: 'track-4',
    title: 'Morning Brew',
    artist: 'Café Acoustics',
    album: 'Coffee Shop Sessions',
    duration: '3:55',
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Cozy', 'Warm', 'Inviting'],
    genre: 'Jazz',
    bpm: 78,
  },
  {
    id: 'track-5',
    title: 'Digital Dreams',
    artist: 'Neon Pulse',
    album: 'Future Forward',
    duration: '4:02',
    cover: '/images/album-urban-flow.jpg',
    moods: ['Modern', 'Energetic', 'Tech'],
    genre: 'Electronic',
    bpm: 120,
  },
  {
    id: 'track-6',
    title: 'Zen Garden',
    artist: 'Tranquil Tones',
    album: 'Mindful Moments',
    duration: '5:10',
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Serene', 'Meditative', 'Balanced'],
    genre: 'New Age',
    bpm: 65,
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

export function getRecommendedTracks(industry: string): MusicTrack[] {
  const trackIds = INDUSTRY_MUSIC_MAP[industry] || INDUSTRY_MUSIC_MAP['Services'];
  return trackIds.map(id => MUSIC_TRACKS.find(t => t.id === id)!).filter(Boolean);
}

export function getTracksByMood(mood: string): MusicTrack[] {
  return MUSIC_TRACKS.filter(t => t.moods.some(m => m.toLowerCase().includes(mood.toLowerCase())));
}

export function getTracksByGenre(genre: string): MusicTrack[] {
  return MUSIC_TRACKS.filter(t => t.genre.toLowerCase() === genre.toLowerCase());
}
