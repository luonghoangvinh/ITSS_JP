import { useState, useMemo, useEffect } from 'react';
<<<<<<< Updated upstream
import { Search, Bell, Languages } from 'lucide-react';
import './LessonChoose.css';

import cafeImage from '../../assets/cafe.jpg';
import choImage from '../../assets/cho.jpg';
import tradfoodImage from '../../assets/tradfood.jpg';
import tradmusicImage from '../../assets/tradmusic.jpg';
import tradoutfitImage from '../../assets/tradoutfit.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import type LessonByLevelType from '../../types/lessonByLevelType';
import mapLesson from '../../utils/mapLesson';

=======
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Languages } from 'lucide-react';
import './LessonChoose.css';

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream


// Sample lesson data
const lessonDataSample: Lesson[] = [
  {
    id: 1,
    lessonName: 'コーヒー文化',
    topic: 'ライフスタイル',
    rating: 4.9,
    image: cafeImage,
    summary: {
      hiragana: 'ベトナムのコーヒー文化',
      romaji: 'Betonamu no kōhī bunka'
    },
    category: 'lifestyle'
  },
  {
    id: 2,
    lessonName: '屋台料理のマナー',
    topic: 'エチケット',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=250&fit=crop',
    summary: {
      hiragana: '屋台料理のマナー',
      romaji: 'Yatai ryōri no manā'
    },
    category: 'etiquette'
  },
  {
    id: 3,
    lessonName: '伝統音楽',
    topic: '芸術',
    rating: 5.0,
    image: tradmusicImage,
    summary: {
      hiragana: '伝統音楽',
      romaji: 'Dentō ongaku'
    },
    category: 'music'
  },
  {
    id: 4,
    lessonName: '市場での値切り交渉',
    topic: '商業',
    rating: 4.7,
    image: choImage,
    summary: {
      hiragana: '市場での値切り交渉',
      romaji: 'Ichiba de no negiri kōshō'
    },
    category: 'market'
  },
  {
    id: 5,
    lessonName: '旧正月（テト）',
    topic: '休日',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=250&fit=crop',
    summary: {
      hiragana: 'テト（旧正月）',
      romaji: 'Teto (Kyūshōgatsu)'
    },
    category: 'festival'
  },
  {
    id: 6,
    lessonName: 'バイクカオス',
    topic: 'モダン',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    summary: {
      hiragana: 'バイクの交通事情',
      romaji: 'Baiku no kōtsū jijō'
    },
    category: 'modern'
  },
  {
    id: 7,
    lessonName: 'ベトナム料理の基本',
    topic: '食文化',
    rating: 4.8,
    image: tradfoodImage,
    summary: {
      hiragana: 'ベトナム料理の特徴',
      romaji: 'Betonamu ryōri no tokuchō'
    },
    category: 'food'
  },
  {
    id: 8,
    lessonName: '家族文化',
    topic: '社会',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=250&fit=crop',
    summary: {
      hiragana: 'ベトナム家族の価値観',
      romaji: 'Betonamu kazoku no kachikan'
    },
    category: 'social'
  },
  {
    id: 9,
    lessonName: '民族衣装',
    topic: '伝統',
    rating: 4.9,
    image: tradoutfitImage,
    summary: {
      hiragana: 'アオザイと民族衣装',
      romaji: 'Aozai to minzoku ishou'
    },
    category: 'tradition'
  }
];




=======
>>>>>>> Stashed changes
const INITIAL_VISIBLE_LESSONS = 6;

export function LessonChoose() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
<<<<<<< Updated upstream
  const [lessonData,setLessonData] = useState<Lesson[]>(lessonDataSample);
  const navigation = useNavigate();
=======
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advancedLesson, setAdvancedLesson] = useState<Lesson | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Gọi qua proxy /api thay vì http://localhost:3000 để bypass hoàn toàn CORS
        const response = await fetch('/api/lessons');
        if (!response.ok) {
          throw new Error('Mạng hoặc server gặp lỗi');
        }
        const data = await response.json();
        
        const mappedLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          title: item.lessonName || '無題',
          theme: item.topic || 'テーマなし',
          rating: item.rating ? Number(item.rating) : 5.0,
          image: item.image || 'https://placehold.co/600x400/f5f0ed/333?text=No+Image',
          summary: {
            hiragana: item.description || '',
            romaji: item.lessonContent || ''
          },
          category: item.level || 'general'
        }));
        
        setLessons(mappedLessons);
        
        if (mappedLessons.length > 0) {
          const randomIndex = Math.floor(Math.random() * mappedLessons.length);
          setAdvancedLesson(mappedLessons[randomIndex]);
        }
      } catch (err: any) {
        console.error('Error fetching lessons:', err);
        setError('Không thể kết nối đến máy chủ. Hãy chắc chắn backend đang chạy và vite.config.ts đã được cài đặt proxy.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);
>>>>>>> Stashed changes

  // Filter lessons based on search term
  const filteredLessons = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) return lessons;
    return lessons.filter(
      lesson =>
<<<<<<< Updated upstream
        lesson.lessonName.toLowerCase().includes(lowercasedSearchTerm) ||
        lesson.topic.toLowerCase().includes(lowercasedSearchTerm) ||
        lesson.summary.hiragana.includes(lowercasedSearchTerm) ||
        lesson.summary.romaji.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm,lessonData]);
=======
        (lesson.title || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.theme || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.summary.hiragana || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (lesson.summary.romaji || '').toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm, lessons]);
>>>>>>> Stashed changes

  // Determine which lessons to display
  const displayedLessons = showAll ? filteredLessons : filteredLessons.slice(0, INITIAL_VISIBLE_LESSONS);
  const hasMoreLessons = filteredLessons.length > INITIAL_VISIBLE_LESSONS && !showAll;

<<<<<<< Updated upstream
  const handleListeningClick = (lessonlessonName: string) => {
    console.log(`Listening for: ${lessonlessonName}`);
    // Navigate to listening page
    
  };

  const handleShadowingClick = (lessonlessonName: string) => {
    console.log(`Shadowing for: ${lessonlessonName}`);
    // Navigate to shadowing page
    navigation('/home/shadowing');
=======
  const handleListeningClick = (lessonTitle: string) => {
    console.log(`Listening for: ${lessonTitle}`);
    navigate('/home/listening');
  };

  const handleShadowingClick = (lessonTitle: string) => {
    console.log(`Shadowing for: ${lessonTitle}`);
    navigate('/home/shadowing');
>>>>>>> Stashed changes
  };

  const { urlLevel } = useParams();

  useEffect(() => {
    const fetchLessons = async () => {
      try {


        const res = await fetch(`/api/lessons/level/${urlLevel}`);

        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data: LessonByLevelType[] = await res.json();

        const mapped: Lesson[] = data.map(mapLesson);

        setLessonData(mapped);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchLessons();
  }, []);


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
<<<<<<< Updated upstream
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
=======
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
                  <img src={lesson.image} alt={lesson.title} />
                </div>

                {/* Lesson Theme and Rating */}
                <div className="lesson-header-info">
                  <span className="lesson-theme">{lesson.theme}</span>
                  <span className="lesson-rating">★ {lesson.rating}</span>
                </div>

                {/* Lesson Title */}
                <h3 className="lesson-title">{lesson.title}</h3>
>>>>>>> Stashed changes

                {/* Lesson Summary */}
                <div className="lesson-summary">
                  <p className="summary-hiragana">{lesson.summary.hiragana}</p>
                  <p className="summary-romaji">{lesson.summary.romaji}</p>
                </div>

<<<<<<< Updated upstream
              {/* Action Buttons */}
              <div className="lesson-buttons">
                <button
                  className="btn-listening"
                  onClick={() => handleListeningClick(lesson.lessonName)}
                >
                  リスニング
                </button>
                <button
                  className="btn-shadowing"
                  onClick={() => handleShadowingClick(lesson.lessonName)}
                >
                  シャドウイング
                </button>
=======
                {/* Action Buttons */}
                <div className="lesson-buttons">
                  <button
                    className="btn-listening"
                    onClick={() => handleListeningClick(lesson.title)}
                  >
                    リスニング
                  </button>
                  <button
                    className="btn-shadowing"
                    onClick={() => handleShadowingClick(lesson.title)}
                  >
                    シャドウイング
                  </button>
                </div>
>>>>>>> Stashed changes
              </div>
            ))}
          </div>
        )}

        {/* Advanced Lesson Preview */}
        {advancedLesson && (
          <div className="advanced-lesson-preview">
            <div className="advanced-lesson-image">
              <img src={advancedLesson.image} alt={advancedLesson.title} />
            </div>
            <div className="advanced-lesson-content">
              <p className="advanced-lesson-subtitle">特別レッスン</p>
              <h2 className="advanced-lesson-title">{advancedLesson.title}</h2>
              <p className="advanced-lesson-description">
                {advancedLesson.summary.hiragana}
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
