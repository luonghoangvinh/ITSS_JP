import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Bell, Languages } from 'lucide-react';
import './LessonChoose.css';

import type LessonByLevelType from '../../types/lessonByLevelType';
import mapLesson from '../../utils/mapLesson';

interface Lesson {
  id: number;
  lessonName: string;
  topic: string;
  rating: number;
  image: string;
  summary: {
    hiragana: string;
    romaji: string;
  };
  category?: string;
  level?: string;
}

const INITIAL_VISIBLE_LESSONS = 6;

export function LessonChoose() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [lessonData, setLessonData] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advancedLesson, setAdvancedLesson] = useState<Lesson | null>(null);
  
  const navigate = useNavigate();
  const { urlLevel } = useParams();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const url = urlLevel ? `/api/lessons/level/${urlLevel}` : '/api/lessons';
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data = await res.json();
        let mapped: Lesson[];

        if (urlLevel && data.length > 0 && typeof mapLesson === 'function') {
          mapped = data.map(mapLesson);
        } else {
          mapped = data.map((item: any) => ({
            id: item.id,
            lessonName: item.lessonName || '無題',
            topic: item.topic || 'テーマなし',
            rating: item.rating ? Number(item.rating) : 5.0,
            image: item.image || 'https://placehold.co/600x400/f5f0ed/333?text=No+Image',
            summary: {
              hiragana: item.description || '',
              romaji: item.lessonContent || ''
            },
            category: item.level || 'general'
          }));
        }

        setLessonData(mapped);
        if (mapped.length > 0) {
          const randomIndex = Math.floor(Math.random() * mapped.length);
          setAdvancedLesson(mapped[randomIndex]);
        }
      } catch (err: any) {
        console.error(err);
        setError('Không thể kết nối đến máy chủ. Hãy chắc chắn backend đang chạy và vite.config.ts đã được cài đặt proxy.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [urlLevel]);

  // Filter lessons based on search term
  const filteredLessons = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) return lessonData;
    return lessonData.filter(
      lesson =>
        (lesson.lessonName || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.topic || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.summary?.hiragana || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.summary?.romaji || '').toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm, lessonData]);

  // Determine which lessons to display
  const displayedLessons = showAll ? filteredLessons : filteredLessons.slice(0, INITIAL_VISIBLE_LESSONS);
  const hasMoreLessons = filteredLessons.length > INITIAL_VISIBLE_LESSONS && !showAll;

  const handleListeningClick = (lessonId: number) => {
    console.log(`Listening for lesson ID: ${lessonId}`);
    navigate('/home/listening', { state: { lessonId } });
  };

  const handleShadowingClick = (lessonId: number) => {
    console.log(`Shadowing for lesson ID: ${lessonId}`);
    navigate('/home/shadowing', { state: { lessonId } });
  };
  return (
    <div className="lesson-choose-container">
      {/* Top Header Bar with Search, Notification, and Settings */}
      <div className="top-header-bar">
        <div className="search-bar-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="レッスン、単語、文化を検索..."
            aria-label="レッスン、単語、文化を検索..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="top-right-buttons">
          <button className="icon-button notification-btn" title="Notifications">
            <Bell size={20} />
          </button>
          <button className="icon-button language-btn" title="Language Settings">
            <Languages size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lesson-content">
        {/* Header with lessonName and See More Button */}
        <div className="lesson-header">
          <div className="lesson-lessonName-section">
            <p>ベトナムトークアカデミー</p>
            <h1>トピックを選択してください</h1>
          </div>
          {hasMoreLessons && (
            <button
              className="btn-see-more-header"
              onClick={() => setShowAll(true)}
            >
              もっと見る
            </button>
          )}
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>読み込み中...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#e8707f', fontWeight: 'bold' }}>{error}</div>
        ) : (
          <div className="lessons-grid">
            {displayedLessons.map(lesson => (
              <div
                key={lesson.id}
                className={`lesson-card ${selectedLesson === lesson.id ? 'selected' : ''}`}
                onClick={() => setSelectedLesson(lesson.id)}
              >
                {/* Lesson Image */}
                <div className="lesson-image">
                  <img src={lesson.image} alt={lesson.lessonName} />
                </div>

                {/* Lesson Topic and Rating */}
                <div className="lesson-header-info">
                  <span className="lesson-topic">{lesson.topic}</span>
                  <span className="lesson-rating">★ {lesson.rating}</span>
                </div>

                {/* Lesson lessonName */}
                <h3 className="lesson-lessonName">{lesson.lessonName}</h3>

                {/* Lesson Summary */}
                <div className="lesson-summary">
                  <p className="summary-hiragana">{lesson.summary?.hiragana}</p>
                  <p className="summary-romaji">{lesson.summary?.romaji}</p>
                </div>

                {/* Action Buttons */}
                <div className="lesson-buttons">
                  <button
                    className="btn-listening"
                    onClick={() => handleListeningClick(lesson.id)}
                  >
                    リスニング
                  </button>
                  <button
                    className="btn-shadowing"
                    onClick={() => handleShadowingClick(lesson.id)}
                  >
                    シャドウイング
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Advanced Lesson Preview */}
        {advancedLesson && (
          <div className="advanced-lesson-preview">
            <div className="advanced-lesson-image">
              <img src={advancedLesson.image} alt={advancedLesson.lessonName} />
            </div>
            <div className="advanced-lesson-content">
              <p className="advanced-lesson-subtitle">特別レッスン</p>
              <h2 className="advanced-lesson-title">{advancedLesson.lessonName}</h2>
              <p className="advanced-lesson-description">
                {advancedLesson.summary?.hiragana}
              </p>
              <button className="btn-advanced-course">上級コースを始める</button>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && displayedLessons.length === 0 && (
          <div className="no-results">
            <p>検索結果がありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
