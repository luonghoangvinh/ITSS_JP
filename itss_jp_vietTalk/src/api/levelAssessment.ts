export interface LevelAssessmentItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: 'completed' | 'inProgress' | 'needsReview';
  buttonLabel: string;
  buttonColor: string;
}

export interface LevelAssessmentResponse {
  completedTests: number;
  averageScore: number;
  audioSpeed: number;
  progress: {
    overall: number;
    listening: number;
    vocabulary: number;
  };
  items: LevelAssessmentItem[];
}

const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchLevelAssessment(): Promise<LevelAssessmentResponse> {
  const res = await fetch(`${API_BASE}/api/level-assessment`);
  if (!res.ok) throw new Error('Failed to fetch level assessment data');
  return res.json();
}

export async function updateAssessmentSpeed(speed: number): Promise<{ audioSpeed: number }> {
  const res = await fetch(`${API_BASE}/api/level-assessment/speed`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ speed }),
  });
  if (!res.ok) throw new Error('Failed to update audio speed');
  return res.json();
}
