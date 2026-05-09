import { useState, useMemo } from 'react';
import { Search, Bell, Languages } from 'lucide-react';
import './LessonChoose.css';

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
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=250&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1488749807830-63789f68bb65?w=400&h=250&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    summary: {
      hiragana: 'アオザイと民族衣装',
      romaji: 'Aozai to minzoku ishou'
    },
    category: 'tradition'
  }
];

export function LessonChoose() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Filter lessons based on search term
  const filteredLessons = useMemo(() => {
    return lessonData.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Determine which lessons to display
  const displayedLessons = showAll ? filteredLessons : filteredLessons.slice(0, 6);
  const hasMoreLessons = filteredLessons.length > 6 && !showAll;

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
            <h1>ベトナムトークアカデミー</h1>
            <p>トピックを選択してください</p>
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
            <div key={lesson.id} className="lesson-card">
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
