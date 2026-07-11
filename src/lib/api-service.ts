// Unified API service - tries real AI first, falls back to local

import { recommend, type MusicRecommendation } from './music-recommender';

const API_BASE = '/api';

interface AnalysisResult {
  suggestion: string;
  industry: string;
  modules: string[];
  template: string;
  colorScheme: { primary: string; accent: string };
  reasoning: string;
  matchedKeywords: string[];
}

async function apiCall<T>(path: string, body?: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null; // network error = fallback to local
  }
}

// Check if server is reachable and which AI provider is active
export async function checkApiStatus(): Promise<{ hasAI: boolean; provider: string }> {
  const result = await apiCall<{ status: string; hasOpenAI: boolean; aiProvider?: string }>('/status');
  return {
    hasAI: result?.hasOpenAI ?? false,
    provider: result?.aiProvider ?? 'local',
  };
}

// Analyze industry + structure (calls DeepSeek/OpenAI if available)
export async function analyzeSite(prompt: string): Promise<AnalysisResult | null> {
  return apiCall<AnalysisResult>('/analyze', { text: prompt });
}

// Recommend music (calls DeepSeek/OpenAI + library matching if available)
export async function recommendMusic(prompt: string): Promise<MusicRecommendation> {
  const result = await apiCall<MusicRecommendation>('/music/recommend', { text: prompt });
  // Fall back to local Thayer model if API unavailable
  return result ?? recommend(prompt);
}

// Save website config
export async function saveSiteConfig(title: string, config: unknown) {
  return apiCall<{ id: string; message: string }>('/config/save', { title, config });
}

export type { AnalysisResult };
