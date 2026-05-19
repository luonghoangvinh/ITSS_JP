import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, CheckCircle2, ChevronDown } from 'lucide-react';
import './Listening.css';

export function Listening() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const speeds = [0.25, 0.5, 1, 1.25, 1.5];

  return (
    <div className="listening-container">
      <div className="listening-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-titles">
          <p className="level-subtitle">レベル C・リスニング</p>
          <h1 className="lesson-main-title">ハノイでの日常会話</h1>
        </div>
      </div>

      <div className="player-card">
        <div className="player-image-wrapper">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" alt="Hanoi" className="player-image" />
        </div>

        <div className="progress-container">
          <span className="time-text">01:42</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <span className="time-text">03:50</span>
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
            <button className="skip-btn">
              <RotateCcw size={24} />
              <span className="skip-text">10</span>
            </button>

            <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>

            <button className="skip-btn">
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
            <button className="lang-btn active">VN</button>
            <button className="lang-btn">JP</button>
          </div>
        </div>

        <div className="dialogue-container">
          <div className="dialogue-row">
            <div className="avatar a-avatar">A</div>
            <div className="bubble">
              <p className="vn-text"><span className="highlight-text">Chào anh!</span> Anh có muốn thử món phở bò truyền thống của chúng tôi không?</p>
              <div className="jp-text-wrapper">
                <p className="jp-text">
                  <ruby>こんにちは<rt>わたし</rt></ruby> <ruby>私<rt>でんとうてき</rt></ruby>たちの伝統的<ruby>な牛肉<rt>ぎゅうにく</rt></ruby>フォーを<ruby>試<rt>ため</rt></ruby>してみませんか？
                </p>
              </div>
            </div>
          </div>

          <div className="dialogue-row">
            <div className="avatar b-avatar">B</div>
            <div className="bubble">
              <p className="vn-text"><span className="highlight-text">Vâng, cho tôi một bát nhé.</span> Phở ở đây có gì đặc biệt không ạ?</p>
              <div className="jp-text-wrapper">
                <p className="jp-text">
                  <ruby>はい<rt>はい</rt></ruby>、1杯ください。ここのフォーには<ruby>何<rt>なに</rt></ruby>か<ruby>特別<rt>とくべつ</rt></ruby>なところがありますか？
                </p>
              </div>
            </div>
          </div>

          <div className="dialogue-row">
            <div className="avatar a-avatar">A</div>
            <div className="bubble">
              <p className="vn-text">Nước dùng của chúng tôi được ninh từ xương ống trong 24 giờ đấy ạ.</p>
              <div className="jp-text-wrapper">
                <p className="jp-text">
                  <ruby>私<rt>わたし</rt></ruby>たちのスープは、<ruby>牛<rt>ぎゅう</rt></ruby>の<ruby>骨<rt>ほね</rt></ruby>を24<ruby>時間煮<rt>じかんにこ</rt></ruby>込んで<ruby>作<rt>つく</rt></ruby>っています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section">
        <p className="test-prompt">理解度をテストする準備はできましたか？</p>
        <button className="finish-btn" onClick={() => navigate('/home/lessons')}>
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