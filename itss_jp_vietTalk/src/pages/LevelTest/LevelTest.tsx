import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LevelTest.css';
// UI icons removed for audio control

// Mock test data
const mockTestData = {
  title: 'Bài kiểm tra trình độ',
  totalQuestions: 10,
  timeLimit: 600, // 10 minutes in seconds
  questions: [
    {
      id: 1,
      question: 'Đọc đoạn sau và chọn ý nghĩa đúng của từ/đoạn được gạch dưới.',
      prompt: 'Đoạn: "Công ty đó đóng góp lớn cho sự phát triển kinh tế địa phương."',
      options: [
        { id: 'a', text: 'Về mặt kinh tế', isCorrect: true },
        { id: 'b', text: 'Về mặt văn hóa', isCorrect: false },
        { id: 'c', text: 'Về mặt xã hội', isCorrect: false },
        { id: 'd', text: 'Về mặt chính trị', isCorrect: false },
      ],
    },
    {
      id: 2,
      question: 'Chọn từ phù hợp nhất để hoàn thành câu dưới đây.',
      prompt: 'Hoàn thành câu: "Biện pháp này được chứng minh là rất ___ đối với người dùng."',
      options: [
        { id: 'a', text: 'Quan trọng', isCorrect: false },
        { id: 'b', text: 'Có hiệu lực', isCorrect: true },
        { id: 'c', text: 'Nổi tiếng', isCorrect: false },
        { id: 'd', text: 'Có hại', isCorrect: false },
      ],
    },
    {
      id: 3,
      question: 'Đọc đoạn văn ngắn dưới đây và chọn thông tin đúng.',
      prompt: 'Đoạn: "Năm ngoái, xuất khẩu tăng 10% và đóng góp tích cực cho tăng trưởng."',
      options: [
        { id: 'a', text: 'Về kinh tế của Việt Nam', isCorrect: true },
        { id: 'b', text: 'Về văn hóa của Việt Nam', isCorrect: false },
        { id: 'c', text: 'Về lịch sử của Việt Nam', isCorrect: false },
        { id: 'd', text: 'Về địa lý của Việt Nam', isCorrect: false },
      ],
    },
    {
      id: 4,
      question: 'Chọn chữ kana/biểu diễn đúng cho từ được cho.',
      prompt: 'Từ: "ま" — hãy chọn chữ kana/bảng biểu diễn phù hợp.',
      options: [
        { id: 'a', text: 'マー', isCorrect: false },
        { id: 'b', text: 'マ', isCorrect: true },
        { id: 'c', text: 'ミ', isCorrect: false },
        { id: 'd', text: 'ム', isCorrect: false },
      ],
    },
    {
      id: 5,
      question: 'Đọc đoạn hội thoại ngắn và chọn ý nghĩa phù hợp nhất.',
      prompt: 'Hội thoại: A: "Xin chào" B: "Xin chào" — Họ đang thực hiện hành động gì?',
      options: [
        { id: 'a', text: 'Đang chào hỏi', isCorrect: true },
        { id: 'b', text: 'Đang chia tay', isCorrect: false },
        { id: 'c', text: 'Đang cảm ơn', isCorrect: false },
        { id: 'd', text: 'Đang xin lỗi', isCorrect: false },
      ],
    },
    {
      id: 6,
      question: 'Trong câu dưới đây, chủ ngữ là gì?',
      prompt: 'Câu: "Tôi đã hoàn thành bài tập."',
      options: [
        { id: 'a', text: 'Tôi', isCorrect: true },
        { id: 'b', text: 'Bạn', isCorrect: false },
        { id: 'c', text: 'Anh ấy', isCorrect: false },
        { id: 'd', text: 'Không rõ', isCorrect: false },
      ],
    },
    {
      id: 7,
      question: 'Ý nghĩa chính xác của từ/đoạn này là gì?',
      prompt: 'Câu: "Đó là một sản phẩm xấu." — Chọn nghĩa phù hợp cho từ "xấu".',
      options: [
        { id: 'a', text: 'Tốt', isCorrect: false },
        { id: 'b', text: 'Xấu', isCorrect: true },
        { id: 'c', text: 'Bình thường', isCorrect: false },
        { id: 'd', text: 'Đặc biệt', isCorrect: false },
      ],
    },
    {
      id: 8,
      question: 'Chọn từ trái nghĩa phù hợp cho từ đã cho.',
      prompt: 'Từ được cho: "to". Chọn từ trái nghĩa phù hợp.',
      options: [
        { id: 'a', text: 'To', isCorrect: true },
        { id: 'b', text: 'Mới', isCorrect: false },
        { id: 'c', text: 'Cũ', isCorrect: false },
        { id: 'd', text: 'Thích', isCorrect: false },
      ],
    },
    {
      id: 9,
      question: 'Chọn cấu trúc ngữ pháp đúng để hoàn thành câu.',
      prompt: 'Câu: "Cô ấy đang ăn." — Chọn cấu trúc phù hợp.',
      options: [
        { id: 'a', text: '〜ている', isCorrect: true },
        { id: 'b', text: '〜だ', isCorrect: false },
        { id: 'c', text: '〜う', isCorrect: false },
        { id: 'd', text: '〜い', isCorrect: false },
      ],
    },
    {
      id: 10,
      question: 'Câu cuối: Đọc đoạn ngắn và chọn đáp án phù hợp nhất.',
      prompt: 'Đoạn: "Bài kiểm tra đã hoàn thành." — Chọn nội dung phù hợp nhất.',
      options: [
        { id: 'a', text: 'Hoàn thành bài kiểm tra', isCorrect: true },
        { id: 'b', text: 'Đang làm bài', isCorrect: false },
        { id: 'c', text: 'Bắt đầu bài kiểm tra', isCorrect: false },
        { id: 'd', text: 'Bài kiểm tra không thành công', isCorrect: false },
      ],
    },
  ],
};

export default function LevelTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
  const [timeLeft, setTimeLeft] = useState(mockTestData.timeLimit);
  // audio controls removed; questions converted to text
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      // If first question, go back to Level Assessment
      if (window.confirm('Bạn có muốn dừng bài kiểm tra và về màn hình đánh giá trình độ không?')) {
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
    alert(`Bài kiểm tra hoàn tất!\nĐiểm: ${score}%\nĐúng: ${correctCount}/${mockTestData.totalQuestions}`);
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
      
      {/* Main Content */}
      <div className="level-test-content">
        {/* Header */}
        <div className="level-test-header">
          <h1 className="level-test-title">{mockTestData.title}</h1>
          <div className="level-test-timer">
            <span className="timer-label">Thời gian còn lại</span>
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

          {currentQ.prompt && (
            <p className="question-prompt">{currentQ.prompt}</p>
          )}

          {/* Audio removed — questions shown as text */}

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
            title={currentQuestion === 0 ? 'Dừng bài kiểm tra' : 'Câu trước'}
          >
            Quay lại
          </button>

          <button 
            onClick={handleNextQuestion}
            className="btn-next"
            disabled={!selectedAnswer}
            title={currentQuestion === mockTestData.totalQuestions - 1 ? 'Nộp bài' : 'Tiếp theo'}
          >
            {currentQuestion === mockTestData.totalQuestions - 1 ? 'Nộp bài' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    </div>
  );
}
