import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, CheckCircle2, ChevronDown } from 'lucide-react';
import SrtParser2 from "srt-parser-2";
import './Listening.css';
import timeToSeconds from '../../../utils/timeToSeconds';

export function Listening() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const [lessonData, setLessonData] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [subtitle, setSubtitle] = useState<any[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [subtitleJP, setSubtitleJP] = useState<any[]>([]);
  const [currentSubtitleJP, setCurrentSubtitleJP] = useState('');

  const [subtitleModeVN,setSubtitleModeVN]=useState<Boolean>(true);

  const lessonId = location.state?.lessonId;

const API_BASE = import.meta.env.VITE_API_URL || '';
  useEffect(() => {
    if (lessonId) {
      fetch(`${API_BASE}/api/lessons/${lessonId}`)
        .then(res => res.json())
        .then(data => {
          setLessonData(data);
        })
        .catch(err => console.error(err));
    }

  }, [lessonId]);

  useEffect(() => {
    if (lessonData != null) {
      const fetchSubtitle = async () => {

        const res = await fetch(lessonData.lessonContent);
        const srtText = await res.text();
        const parser = new SrtParser2();
        const parsed = parser.fromSrt(srtText);

        const resJP = await fetch(lessonData.lessonContentJp);
        const srtTextJP = await resJP.text();
        
        const parsedJP = parser.fromSrt(srtTextJP);

        const formatted = parsed.map((sub) => ({
          startTime: timeToSeconds(sub.startTime),
          endTime: timeToSeconds(sub.endTime),
          text: sub.text
        }))
        const formattedJP = parsedJP.map((sub) => ({
          startTime: timeToSeconds(sub.startTime),
          endTime: timeToSeconds(sub.endTime),
          text: sub.text
        }))
        setSubtitle(formatted);
        setSubtitleJP(formattedJP);
      }
      fetchSubtitle();
    }
  }, [lessonData])

  const speeds = [0.25, 0.5, 1, 1.25, 1.5];

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100 || 0);
      setCurrentTime(formatTime(current));

      const currentText = subtitle.find((sub) =>
        current >= sub.startTime && current <= sub.endTime
      )
      const currentTextJP = subtitleJP.find((sub) =>
        current >= sub.startTime && current <= sub.endTime
      )
      setCurrentSubtitle(currentText?.text || "");
      setCurrentSubtitleJP(currentTextJP?.text||"");

    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div className="listening-container">
      <div className="listening-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-titles">
          <p className="level-subtitle">レベル {lessonData?.level || 'C'}・リスニング</p>
          <h1 className="lesson-main-title">{lessonData?.lessonName || '読み込み中...'}</h1>
        </div>
      </div>

      <div className="player-card">
        {lessonData?.video && (
          <audio
            ref={audioRef}
            src={lessonData.video}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}
        <div className="player-image-wrapper">
          <img src={lessonData?.image || "https://placehold.co/400x400/f5f0ed/333?text=No+Image"} alt={lessonData?.lessonName || "Lesson"} className="player-image" />
        </div>

        <div className="progress-container">
          <span className="time-text">{currentTime}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="time-text">{duration}</span>
        </div>

        <div className="player-controls">
          <div className="speed-control">
            <button className="speed-btn" onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
              速度 <ChevronDown size={16} />
            </button>
            {showSpeedMenu && (
              <div className="speed-menu">
                {speeds.map(s => (
                  <button
                    key={s}
                    className={`speed-option ${speed === s ? 'active' : ''}`}
                    onClick={() => { setSpeed(s); setShowSpeedMenu(false); }}
                  >
                    x{s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="main-controls">
            <button className="skip-btn" onClick={() => {
              if (audioRef.current) audioRef.current.currentTime -= 10;
            }}>
              <RotateCcw size={24} />
              <span className="skip-text">10</span>
            </button>

            <button className="play-pause-btn" onClick={handlePlayPause}>
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>

            <button className="skip-btn" onClick={() => {
              if (audioRef.current) audioRef.current.currentTime += 10;
            }}>
              <RotateCw size={24} />
              <span className="skip-text">10</span>
            </button>
          </div>

          <div style={{ width: '80px' }}></div>
        </div>
      </div>

      <div className="transcription-section">
        <div className="transcription-header">
          <div className="transcription-title">
            <span className="cc-icon">CC</span>
            転写
          </div>
          <div className="lang-toggle">
            <button className={`lang-btn ${subtitleModeVN?"active":""}`} onClick={()=>setSubtitleModeVN(true)}>VN</button>
            <button className={`lang-btn ${!subtitleModeVN?"active":""}`} onClick={()=>setSubtitleModeVN(false)}>JP</button>
          </div>
        </div>

        <div className="dialogue-container">
          <div className="dialogue-row">
            <div className="avatar a-avatar">A</div>
            <div className="bubble">
              <p className="vn-text"><p className="highlight-text">{subtitleModeVN?currentSubtitle:currentSubtitleJP}</p></p>
              <div className="jp-text-wrapper">
                <p className="jp-text">

                </p>
              </div>
            </div>
          </div>

          

          
        </div>
      </div>

      <div className="footer-section">
        <p className="test-prompt">理解度をテストする準備はできましたか？</p>
        <button className="finish-btn" onClick={() => navigate(`/home/lessons/${lessonData.level}`)}>
          終了 <CheckCircle2 size={20} />
        </button>
        <p className="xp-reward">+250 XP報酬</p>
      </div>

      <div className="did-you-know-tooltip">
        <div className="tooltip-header">
          <span className="bulb-icon">💡</span>
          <strong>ご存知ですか？</strong>
        </div>
        <p>ハノイでは、フォーは伝統的に朝食として食べられています。一方、南部では一日中いつでも人気があります！</p>
      </div>
    </div>
  );
}