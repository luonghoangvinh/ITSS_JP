import { useState, useMemo } from 'react';
import { Search, Bell, Languages } from 'lucide-react';
import './LessonChoose.css';

import cafeImage from '../../assets/cafe.jpg';
import choImage from '../../assets/cho.jpg';
import tradfoodImage from '../../assets/tradfood.jpg';
import tradmusicImage from '../../assets/tradmusic.jpg';
import tradoutfitImage from '../../assets/tradoutfit.jpg';

interface Lesson {
  id: number;
  title: string;
  theme: string;
  rating: number;
  image: string;
  summary: {
    hiragana: string;
    romaji: string;
  };
  category: string;
}

// Sample lesson data
const lessonData: Lesson[] = [
  {
    id: 1,
    title: 'コーヒー文化',
    theme: 'ライフスタイル',
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
    title: '屋台料理のマナー',
    theme: 'エチケット',
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
    title: '伝統音楽',
    theme: '芸術',
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
    title: '市場での値切り交渉',
    theme: '商業',
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
    title: '旧正月（テト）',
    theme: '休日',
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
    title: 'バイクカオス',
    theme: 'モダン',
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
    title: 'ベトナム料理の基本',
    theme: '食文化',
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
    title: '家族文化',
    theme: '社会',
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
    title: '民族衣装',
    theme: '伝統',
    rating: 4.9,
    image: tradoutfitImage,
    summary: {
      hiragana: 'アオザイと民族衣装',
      romaji: 'Aozai to minzoku ishou'
    },
    category: 'tradition'
  }
];

const INITIAL_VISIBLE_LESSONS = 6;

export function LessonChoose() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  // Filter lessons based on search term
  const filteredLessons = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) return lessonData;
    return lessonData.filter(
      lesson =>
        lesson.title.toLowerCase().includes(lowercasedSearchTerm) ||
        lesson.theme.toLowerCase().includes(lowercasedSearchTerm) ||
        lesson.summary.hiragana.includes(lowercasedSearchTerm) ||
        lesson.summary.romaji.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm]);

  // Determine which lessons to display
  const displayedLessons = showAll ? filteredLessons : filteredLessons.slice(0, INITIAL_VISIBLE_LESSONS);
  const hasMoreLessons = filteredLessons.length > INITIAL_VISIBLE_LESSONS && !showAll;

  const handleListeningClick = (lessonTitle: string) => {
    console.log(`Listening for: ${lessonTitle}`);
    // Navigate to listening page
  };

  const handleShadowingClick = (lessonTitle: string) => {
    console.log(`Shadowing for: ${lessonTitle}`);
    // Navigate to shadowing page
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
        {/* Header with Title and See More Button */}
        <div className="lesson-header">
          <div className="lesson-title-section">
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

              {/* Lesson Summary */}
              <div className="lesson-summary">
                <p className="summary-hiragana">{lesson.summary.hiragana}</p>
                <p className="summary-romaji">{lesson.summary.romaji}</p>
              </div>

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
            </div>
          ))}
        </div>

        {/* Advanced Lesson Preview */}
        <div className="advanced-lesson-preview">
          <div className="advanced-lesson-image">
            <img src={tradfoodImage} alt="キッチン会話の" />
          </div>
          <div className="advanced-lesson-content">
            <p className="advanced-lesson-subtitle">特別レッスン</p>
            <h2 className="advanced-lesson-title">キッチン会話の</h2>
            <p className="advanced-lesson-description">
              ベトナム家庭の調理現場で使われる専門語彙を深く学びましょう。隠し味の尋ね方や、日本の文化背景を交えながら食事を共にする方法を習得します。
            </p>
            <button className="btn-advanced-course">上級コースを始める</button>
          </div>
        </div>

        {/* No Results */}
        {displayedLessons.length === 0 && (
          <div className="no-results">
            <p>検索結果がありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
