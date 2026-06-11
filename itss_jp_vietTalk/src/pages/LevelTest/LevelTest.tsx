import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LevelTest.css';
import { Volume2 } from 'lucide-react';

// Mock test data
const mockTestData = {
  title: 'レベルテスト',
  totalQuestions: 10,
  timeLimit: 600, // 10 minutes in seconds
  questions: [
    {
      id: 1,
      question: '音声を聴いて、正しい意味を選んでください。',
      audioUrl: '/audio/question1.mp3',
      options: [
        { id: 'a', text: '経済的な', isCorrect: true },
        { id: 'b', text: '文化的な', isCorrect: false },
        { id: 'c', text: '社会的な', isCorrect: false },
        { id: 'd', text: '政治的な', isCorrect: false },
      ],
    },
    {
      id: 2,
      question: '次の文に最も適切な単語を選んでください。',
      audioUrl: '/audio/question2.mp3',
      options: [
        { id: 'a', text: '重要', isCorrect: false },
        { id: 'b', text: '有効', isCorrect: true },
        { id: 'c', text: '有名', isCorrect: false },
        { id: 'd', text: '有害', isCorrect: false },
      ],
    },
    {
      id: 3,
      question: '音声の内容から推測される情報を選んでください。',
      audioUrl: '/audio/question3.mp3',
      options: [
        { id: 'a', text: 'ベトナムの経済について', isCorrect: true },
        { id: 'b', text: 'ベトナムの文化について', isCorrect: false },
        { id: 'c', text: 'ベトナムの歴史について', isCorrect: false },
        { id: 'd', text: 'ベトナムの地理について', isCorrect: false },
      ],
    },
    {
      id: 4,
      question: '正しい発音を選んでください。',
      audioUrl: '/audio/question4.mp3',
      options: [
        { id: 'a', text: 'マー', isCorrect: false },
        { id: 'b', text: 'マ', isCorrect: true },
        { id: 'c', text: 'ミ', isCorrect: false },
        { id: 'd', text: 'ム', isCorrect: false },
      ],
    },
    {
      id: 5,
      question: '次の会話の意味として最も適切なものを選んでください。',
      audioUrl: '/audio/question5.mp3',
      options: [
        { id: 'a', text: '挨拶している', isCorrect: true },
        { id: 'b', text: '別れを告げている', isCorrect: false },
        { id: 'c', text: '感謝している', isCorrect: false },
        { id: 'd', text: '謝罪している', isCorrect: false },
      ],
    },
    {
      id: 6,
      question: 'この文の主語は何ですか？',
      audioUrl: '/audio/question6.mp3',
      options: [
        { id: 'a', text: '私', isCorrect: true },
        { id: 'b', text: 'あなた', isCorrect: false },
        { id: 'c', text: '彼', isCorrect: false },
        { id: 'd', text: '誰か不明', isCorrect: false },
      ],
    },
    {
      id: 7,
      question: '正しい意味はどれですか？',
      audioUrl: '/audio/question7.mp3',
      options: [
        { id: 'a', text: '良い', isCorrect: false },
        { id: 'b', text: '悪い', isCorrect: true },
        { id: 'c', text: '普通', isCorrect: false },
        { id: 'd', text: '特別', isCorrect: false },
      ],
    },
    {
      id: 8,
      question: '次の単語の反対語を選んでください。',
      audioUrl: '/audio/question8.mp3',
      options: [
        { id: 'a', text: '大きい', isCorrect: true },
        { id: 'b', text: '新しい', isCorrect: false },
        { id: 'c', text: '古い', isCorrect: false },
        { id: 'd', text: '好き', isCorrect: false },
      ],
    },
    {
      id: 9,
      question: '文法として正しいものを選んでください。',
      audioUrl: '/audio/question9.mp3',
      options: [
        { id: 'a', text: '〜ている', isCorrect: true },
        { id: 'b', text: '〜だ', isCorrect: false },
        { id: 'c', text: '〜う', isCorrect: false },
        { id: 'd', text: '〜い', isCorrect: false },
      ],
    },
    {
      id: 10,
      question: '最後の問題です。音声の内容について選んでください。',
      audioUrl: '/audio/question10.mp3',
      options: [
        { id: 'a', text: 'テスト完了', isCorrect: true },
        { id: 'b', text: 'テスト途中', isCorrect: false },
        { id: 'c', text: 'テスト開始', isCorrect: false },
        { id: 'd', text: 'テスト失敗', isCorrect: false },
      ],
    },
  ],
};

export default function LevelTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
  const [timeLeft, setTimeLeft] = useState(mockTestData.timeLimit);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => setIsPlaying(false));
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      // If first question, go back to Level Assessment
      if (window.confirm('テストを中断してレベル判定画面に戻りますか？')) {
        navigate('/home/levelassessment');
      }
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === mockTestData.totalQuestions - 1) {
      // Last question - show results
      handleSubmitTest();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate results
    let correctCount = 0;
    mockTestData.questions.forEach((q, idx) => {
      const selectedId = selectedAnswers[idx];
      const option = q.options.find(opt => opt.id === selectedId);
      if (option?.isCorrect) {
        correctCount++;
      }
    });

    // Navigate to results page (or show results modal)
    const score = Math.round((correctCount / mockTestData.totalQuestions) * 100);
    // For now, just alert the score - you can create a results page later
    alert(`テスト完了！\nスコア: ${score}%\n正解: ${correctCount}/${mockTestData.totalQuestions}`);
    navigate('/home/levelassessment');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = mockTestData.questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / mockTestData.totalQuestions) * 100;

  return (
    <div className="level-test-container">
      <audio ref={audioRef} src={currentQ.audioUrl} />
      
      {/* Main Content */}
      <div className="level-test-content">
        {/* Header */}
        <div className="level-test-header">
          <h1 className="level-test-title">レベルテスト</h1>
          <div className="level-test-timer">
            <span className="timer-label">残り時間</span>
            <span className={`timer-value ${timeLeft < 60 ? 'timer-critical' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="level-test-progress-section">
          <div className="progress-text">
            <span className="progress-current">{currentQuestion + 1}</span>
            <span className="progress-separator">/</span>
            <span className="progress-total">{mockTestData.totalQuestions}</span>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="progress-percentage">{Math.round(progressPercent)}%</span>
          </div>
        </div>

        {/* Question Section */}
        <div className="level-test-question-section">
          {/* Description/Instructions */}
          <p className="question-instruction">
            {currentQ.question}
          </p>

          {/* Audio Play Button */}
          <button 
            onClick={handlePlayAudio}
            className={`audio-button ${isPlaying ? 'playing' : ''}`}
            disabled={isPlaying}
            title="音声を再生する"
          >
            <Volume2 size={24} />
            <span className="audio-button-label">
              {isPlaying ? '再生中...' : '音声再生'}
            </span>
          </button>

          {/* Answer Options */}
          <div className="answer-options">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`answer-card ${
                  selectedAnswer === option.id ? 'selected' : ''
                }`}
              >
                <span className="answer-option-label">{option.id.toUpperCase()}.</span>
                <span className="answer-option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="level-test-navigation">
          <button 
            onClick={handlePreviousQuestion}
            className="btn-back"
            title={currentQuestion === 0 ? 'テストを中断' : '前の問題へ'}
          >
            戻る
          </button>

          <button 
            onClick={handleNextQuestion}
            className="btn-next"
            disabled={!selectedAnswer}
            title={currentQuestion === mockTestData.totalQuestions - 1 ? 'テストを提出' : '次へ'}
          >
            {currentQuestion === mockTestData.totalQuestions - 1 ? '提出' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
