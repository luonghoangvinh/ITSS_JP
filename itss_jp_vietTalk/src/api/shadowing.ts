export interface Phrase {
  id: string;
  jpText: string;
  viText: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  phrases: Phrase[];
}

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchLesson(lessonId: string): Promise<Lesson> {
  const res = await fetch(`${API_BASE}/api/shadowing/lessons/${lessonId}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  return res.json();
}

export async function fetchDefaultLesson(): Promise<Lesson> {
  const res = await fetch(`${API_BASE}/api/shadowing/lessons/default`);
  if (!res.ok) throw new Error('Failed to fetch default lesson');
  return res.json();
}

export async function submitRecording(phraseId: string, blob: Blob): Promise<{ score: number }> {
  const fd = new FormData();
  fd.append('phraseId', phraseId);
  fd.append('file', blob, 'recording.webm');

  const res = await fetch(`${API_BASE}/api/shadowing/recordings`, {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) throw new Error('Failed to upload recording');
  return res.json();
}

export async function fetchStats(lessonId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/shadowing/lessons/${lessonId}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
