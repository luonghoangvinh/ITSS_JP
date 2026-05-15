import { useState, useMemo, useEffect } from 'react';
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

const INITIAL_VISIBLE_LESSONS = 6;


export function LessonChoose() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [lessonData, setLessonData] = useState<Lesson[]>([]);
  const [specialLesson, setSpecialLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();

        // Map dữ liệu từ backend sang cấu trúc frontend sử dụng
        const formattedLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          title: item.lessonName || '無題', // Tên bài học, DB nếu chứa chữ Nhật sẽ tự render font như cũ
          theme: item.topic || 'トピック',
          rating: item.rating ? Number(item.rating) : 0, // Đảm bảo rating là số và đối chiếu theo DB
          image: item.image || '', // Ánh xạ trực tiếp hình ảnh từ database
          summary: {
            hiragana: item.description || '', 
            romaji: item.lessonContent || '' 
          },
          category: item.level || 'beginner'
        }));

        setLessonData(formattedLessons);
        
        // Chọn ngẫu nhiên bài học đặc biệt một lần duy nhất sau khi lấy data
        if (formattedLessons.length > 0) {
          setSpecialLesson(formattedLessons[Math.floor(Math.random() * formattedLessons.length)]);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  // Filter lessons based on search term
  const filteredLessons = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) return lessonData;
    return lessonData.filter(
      lesson =>
        (lesson.title && lesson.title.toLowerCase().includes(lowercasedSearchTerm)) ||
        (lesson.theme && lesson.theme.toLowerCase().includes(lowercasedSearchTerm)) ||
        (lesson.summary.hiragana && lesson.summary.hiragana.toLowerCase().includes(lowercasedSearchTerm)) ||
        (lesson.summary.romaji && lesson.summary.romaji.toLowerCase().includes(lowercasedSearchTerm))
    );
  }, [searchTerm, lessonData]);

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
        {specialLesson && (
          <div className="advanced-lesson-preview">
            <div className="advanced-lesson-image">
              <img src={specialLesson.image} alt={specialLesson.title} />
            </div>
            <div className="advanced-lesson-content">
              <p className="advanced-lesson-subtitle">特別レッスン</p>
              <h2 className="advanced-lesson-title">{specialLesson.title}</h2>
              <p className="advanced-lesson-description">
                {specialLesson.summary.hiragana || specialLesson.summary.romaji}
              </p>
              <button className="btn-advanced-course">上級コースを始める</button>
            </div>
          </div>
        )}

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
