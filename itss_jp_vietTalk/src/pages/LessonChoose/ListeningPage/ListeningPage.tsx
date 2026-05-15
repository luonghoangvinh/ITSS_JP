import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, ChevronDown, CheckCircle2 } from 'lucide-react';
import './ListeningPage.css';

// Dữ liệu giả lập cho Transcript (có thể fetch từ API sau)
const mockTranscript = [
  {
    id: 1,
    speaker: 'A',
    vietnamese: 'Chào anh! Anh có muốn thử món phở bò truyền thống của chúng tôi không?',
    hiragana: 'こんにちは！私たちの伝統的な牛肉フォーを試してみませんか？'
  },
  {
    id: 2,
    speaker: 'B',
    vietnamese: 'Vâng, cho tôi một bát nhé. Phở ở đây có gì đặc biệt không ạ?',
    hiragana: 'はい、1杯ください。ここのフォーには何が特別などところがありますか？'
  },
  {
    id: 3,
    speaker: 'A',
    vietnamese: 'Nước dùng của chúng tôi được ninh từ xương ống trong 24 giờ đấy ạ.',
    hiragana: '私たちのスープは、牛の骨を24時間煮込んで作っています。'
  }
];

export function ListeningPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const getMedia = () => videoRef.current || audioRef.current;

  const [lessonData, setLessonData] = useState<{level?: string, lessonName?: string, video?: string, image?: string} | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [mediaSrc, setMediaSrc] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // File audio/video mẫu

  // Tự động fetch dữ liệu link file audio/video từ DB nếu có
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${id}`);
        if (response.ok) {
          const data = await response.json();
          setLessonData(data);
          if (data.video && data.video.trim() !== '') {
            setMediaSrc(data.video); // Database lưu link vào trường `video`
          }
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };
    if (id) fetchLesson();
  }, [id]);

  // Load lại media khi nguồn (source) thay đổi để trình duyệt cập nhật dữ liệu và cho phép tua
  useEffect(() => {
    const media = getMedia();
    if (media) {
      media.load();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('00:00');
    }
  }, [mediaSrc]);

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    const media = getMedia();
    if (media) {
      const current = media.currentTime;
      const duration = media.duration || 0;
      setProgress(duration > 0 ? (current / duration) * 100 : 0);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    const media = getMedia();
    if (media) {
      setTotalTime(formatTime(media.duration));
      media.playbackRate = playbackRate; // Khôi phục lại tốc độ người dùng đã chọn
    }
  };

  const speedOptions = [0.25, 0.5, 1, 1.25, 1.5];

  const handleBack = () => {
    navigate(-1);
  };
  
  const handleFinish = () => {
    navigate('/home/lessons');
  };

  const togglePlay = () => {
    const media = getMedia();
    if (media) {
      if (isPlaying) {
        media.pause();
        setIsPlaying(false);
      } else {
        media.play()
          .then(() => setIsPlaying(true))
          .catch((e: unknown) => console.error("Error playing media:", e));
      }
    }
  };

  const handleSkip = (amount: number) => {
    const media = getMedia();
    if (media) {
      let newTime = media.currentTime + amount;
      if (newTime < 0) newTime = 0;
      if (newTime > (media.duration || 0)) newTime = media.duration || 0;
      media.currentTime = newTime;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const media = getMedia();
    if (media && media.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      media.currentTime = percentage * media.duration;
    }
  };

  const handleSpeedSelect = (speed: number) => {
    setPlaybackRate(speed);
    const media = getMedia();
    if (media) {
      media.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  return (
    <div className="listening-page-container">
      {/* Header */}
      <div className="listening-header">
        <button className="btn-back" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
        <div className="listening-title-info">
          <span className="level-badge">レベル {lessonData?.level || 'C'} • リスニング</span>
          <h1>{lessonData?.lessonName || 'ハノイでの日常会話'}</h1>
        </div>
      </div>

      <div className="listening-content-layout">
        <div className="main-content-column">
          {/* Audio/Video Player Section */}
          <div className="player-section">
            <div className="player-image-container">
              {lessonData?.video ? (
                <video 
                  ref={videoRef}
                  src={mediaSrc}
                  className="player-cover-image"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  playsInline
                />
              ) : (
                <>
                  <img 
                    src={lessonData?.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop"} 
                    alt="Lesson Cover" 
                    className="player-cover-image"
                  />
                  <audio 
                    ref={audioRef}
                    src={mediaSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  />
                </>
              )}
            </div>
            
            <div className="progress-container">
              <span className="time-text">{currentTime}</span>
              <div className="progress-bar-bg" onClick={handleProgressClick}>
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                <div className="progress-thumb" style={{ left: `${progress}%` }}></div>
              </div>
              <span className="time-text">{totalTime}</span>
            </div>

            <div className="controls-container">
              <div className="speed-control-wrapper">
                <button className="btn-speed-toggle" onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
                  速度 <ChevronDown size={16} />
                </button>
                {showSpeedMenu && (
                  <div className="speed-dropdown">
                    {speedOptions.map(speed => (
                      <button 
                        key={speed}
                        className={`speed-option ${playbackRate === speed ? 'active' : ''}`}
                        onClick={() => handleSpeedSelect(speed)}
                      >
                        x{speed}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="main-controls">
                <button className="btn-skip" onClick={() => handleSkip(-10)}>
                  <RotateCcw size={24} />
                  <span className="skip-text">10</span>
                </button>
                <button className="btn-play-pause" onClick={togglePlay}>
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                </button>
                <button className="btn-skip" onClick={() => handleSkip(10)}>
                  <RotateCw size={24} />
                  <span className="skip-text">10</span>
                </button>
              </div>
              <div className="spacer"></div>
            </div>
          </div>

          {/* Transcript Section */}
          <div className="transcript-section">
            <div className="transcript-header">
              <h2 className="transcript-title"><span className="icon-transcript">📄</span> 転写</h2>
              <div className="language-toggle">
                <span className="lang-pill active">VN</span>
                <span className="lang-pill">JP</span>
              </div>
            </div>

            <div className="transcript-list">
              {mockTranscript.map((item) => (
                <div key={item.id} className="transcript-item">
                  <div className={`speaker-avatar ${item.speaker === 'A' ? 'bg-red' : 'bg-yellow'}`}>{item.speaker}</div>
                  <div className="transcript-bubble">
                    <p className="vietnamese-text">{item.vietnamese}</p>
                    <div className="japanese-translation"><p className="hiragana-ruby">{item.hiragana}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions & Fun Fact */}
      <div className="listening-footer">
        <div className="completion-section">
          <p className="completion-question">理解度をテストする準備はできましたか？</p>
          <button className="btn-finish" onClick={handleFinish}>終了 <CheckCircle2 size={20} /></button>
          <p className="reward-text">+250 XP報酬</p>
        </div>
        <div className="fun-fact-card">
          <div className="fun-fact-header"><span className="fun-fact-icon">💡</span><h3>ご存知ですか？</h3></div>
          <p className="fun-fact-text">ハノイでは、フォーは伝統的に朝食として食べられています。一方、南部では一日中いつでも人気があります！</p>
        </div>
      </div>
    </div>
  );
}