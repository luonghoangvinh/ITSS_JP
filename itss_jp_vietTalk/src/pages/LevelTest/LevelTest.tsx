import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LevelTest.css';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface TestQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
}

interface TopicTestData {
  title: string;
  totalQuestions: number;
  timeLimit: number;
  questions: TestQuestion[];
}

const topicQuestionBanks: Record<string, TopicTestData> = {
  経済: {
    title: 'Bài kiểm tra Kinh tế',
    totalQuestions: 4,
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: 'Trong số sau, từ nào liên quan đến kinh tế?',
        options: [
          { id: 'a', text: 'Giá cả', isCorrect: true },
          { id: 'b', text: 'Ngày nghỉ', isCorrect: false },
          { id: 'c', text: 'Bạn bè', isCorrect: false },
          { id: 'd', text: 'Thời tiết', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: 'Từ nào sau đây có nghĩa gần nhất với từ “cung cấp”?',
        options: [
          { id: 'a', text: 'Cung cấp', isCorrect: true },
          { id: 'b', text: 'Thu nhập', isCorrect: false },
          { id: 'c', text: 'Thương mại', isCorrect: false },
          { id: 'd', text: 'Ngân hàng', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: 'Chọn câu đúng về kinh tế.',
        options: [
          { id: 'a', text: 'Khi giá cả tăng, tiêu dùng giảm.', isCorrect: true },
          { id: 'b', text: 'Khi giá cả giảm, tiêu dùng giảm.', isCorrect: false },
          { id: 'c', text: 'Giá cả luôn giữ nguyên.', isCorrect: false },
          { id: 'd', text: 'Tiêu dùng không liên quan đến giá.', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: 'Ý nghĩa của từ “đầu tư” là gì?',
        options: [
          { id: 'a', text: 'Đưa ra tiền để mong lợi ích trong tương lai', isCorrect: true },
          { id: 'b', text: 'Vay tiền để sử dụng ngay', isCorrect: false },
          { id: 'c', text: 'Dùng hết tiền tiết kiệm', isCorrect: false },
          { id: 'd', text: 'Nộp thuế', isCorrect: false },
        ],
      },
    ],
  },
  辞書: {
    title: 'Bài kiểm tra Từ vựng',
    totalQuestions: 4,
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: 'Chọn từ thích hợp nhất điền vào câu sau.',
        options: [
          { id: 'a', text: 'Bản thảo này chính thức.', isCorrect: false },
          { id: 'b', text: 'Tài liệu này chính thức.', isCorrect: true },
          { id: 'c', text: 'Đoạn văn này chính thức.', isCorrect: false },
          { id: 'd', text: 'Tư liệu này chính thức.', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: 'Từ “đắt” gần nghĩa nhất với từ nào?',
        options: [
          { id: 'a', text: 'Rẻ', isCorrect: false },
          { id: 'b', text: 'Cao', isCorrect: true },
          { id: 'c', text: 'Nặng', isCorrect: false },
          { id: 'd', text: 'Nhanh', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: 'Ý nghĩa của từ “hướng dẫn” là gì?',
        options: [
          { id: 'a', text: 'Giải thích', isCorrect: true },
          { id: 'b', text: 'Lái xe', isCorrect: false },
          { id: 'c', text: 'Dọn dẹp', isCorrect: false },
          { id: 'd', text: 'Nghe', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: 'Chọn câu đúng về ngữ pháp.',
        options: [
          { id: 'a', text: 'Tôi sẽ đi học vào ngày mai.', isCorrect: true },
          { id: 'b', text: 'Tôi sẽ đi học vào ngày mai không.', isCorrect: false },
          { id: 'c', text: 'Tôi đi học vào ngày mai?', isCorrect: false },
          { id: 'd', text: 'Tôi mai đi học.', isCorrect: false },
        ],
      },
    ],
  },
  文化: {
    title: 'Bài kiểm tra Văn hóa',
    totalQuestions: 4,
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: 'Trong số sau, điều nào liên quan đến văn hóa truyền thống Việt Nam?',
        options: [
          { id: 'a', text: 'Tết', isCorrect: true },
          { id: 'b', text: 'Giáng sinh', isCorrect: false },
          { id: 'c', text: 'Lễ Tạ ơn', isCorrect: false },
          { id: 'd', text: 'Halloween', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: 'Ý nghĩa gần nhất của “omotenashi” là gì?',
        options: [
          { id: 'a', text: 'Tấm lòng hiếu khách', isCorrect: true },
          { id: 'b', text: 'Đi nhanh', isCorrect: false },
          { id: 'c', text: 'Ăn nhiều', isCorrect: false },
          { id: 'd', text: 'Chơi đùa', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: 'Câu “giữ phép tắc khi ăn” có nghĩa là gì?',
        options: [
          { id: 'a', text: 'Tuân theo quy tắc khi ăn uống', isCorrect: true },
          { id: 'b', text: 'Ăn nhiều', isCorrect: false },
          { id: 'c', text: 'Bỏ thừa đồ ăn', isCorrect: false },
          { id: 'd', text: 'Giúp đỡ ai đó', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: '“Truyền thống” có nghĩa là gì?',
        options: [
          { id: 'a', text: 'Tập quán được giữ gìn từ xưa', isCorrect: true },
          { id: 'b', text: 'Sản phẩm mới', isCorrect: false },
          { id: 'c', text: 'Bữa ăn hàng ngày', isCorrect: false },
          { id: 'd', text: 'Nơi xa', isCorrect: false },
        ],
      },
    ],
  },
  ビジネス: {
    title: 'Bài kiểm tra Kinh doanh',
    totalQuestions: 4,
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: 'Trong các từ sau, từ nào dùng trong môi trường kinh doanh?',
        options: [
          { id: 'a', text: 'Họp', isCorrect: true },
          { id: 'b', text: 'Kỳ nghỉ', isCorrect: false },
          { id: 'c', text: 'Công viên giải trí', isCorrect: false },
          { id: 'd', text: 'Bữa tối', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: '“Đối tác” trong kinh doanh là ai?',
        options: [
          { id: 'a', text: 'Đối tác kinh doanh', isCorrect: true },
          { id: 'b', text: 'Gia đình', isCorrect: false },
          { id: 'c', text: 'Du khách', isCorrect: false },
          { id: 'd', text: 'Giáo viên', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: 'Câu nào phù hợp cho email công việc?',
        options: [
          { id: 'a', text: 'Kính gửi anh/chị,', isCorrect: true },
          { id: 'b', text: 'Lâu rồi không gặp! Bạn khỏe không?', isCorrect: false },
          { id: 'c', text: 'Đi chơi cùng nhau nhé.', isCorrect: false },
          { id: 'd', text: 'Tối nay đi xem phim nhé.', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: 'Câu nào có ngữ pháp đúng?',
        options: [
          { id: 'a', text: 'Xin anh/chị cho biết thời gian được không?', isCorrect: true },
          { id: 'b', text: 'Xin anh/chị cho biết thời gian không?', isCorrect: false },
          { id: 'c', text: 'Xin anh/chị cho biết thời gian nhé?', isCorrect: false },
          { id: 'd', text: 'Anh/chị có thời gian không?', isCorrect: false },
        ],
      },
    ],
  },
  'テクノロジーと現代生活': {
    title: 'Bài kiểm tra Công nghệ & Đời sống hiện đại',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Từ nào liên quan đến xã hội kỹ thuật số?', options: [
        { id: 'a', text: 'Quyền riêng tư', isCorrect: true },
        { id: 'b', text: 'Ăn uống', isCorrect: false },
        { id: 'c', text: 'Tập thể dục', isCorrect: false },
        { id: 'd', text: 'Du lịch', isCorrect: false },
      ]},
      { id: 2, question: '“Cloud” nghĩa là gì?', options: [
        { id: 'a', text: 'Lưu trữ dữ liệu trực tuyến', isCorrect: true },
        { id: 'b', text: 'Đám mây khi trời mưa', isCorrect: false },
        { id: 'c', text: 'Loại nồi cơm điện', isCorrect: false },
        { id: 'd', text: 'Mạng chậm', isCorrect: false },
      ]},
      { id: 3, question: 'Hành vi nào thích hợp trên mạng xã hội?', options: [
        { id: 'a', text: 'Không công khai thông tin cá nhân', isCorrect: true },
        { id: 'b', text: 'Chia sẻ bài viết người khác mà không xin phép', isCorrect: false },
        { id: 'c', text: 'Chia sẻ tất cả với người lạ', isCorrect: false },
        { id: 'd', text: 'Công khai mật khẩu', isCorrect: false },
      ]},
    ],
  },
  '異文化コミュニケーション': {
    title: 'Bài kiểm tra Giao tiếp liên văn hóa',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Điều gì quan trọng khi giao tiếp giữa các nền văn hóa?', options: [
        { id: 'a', text: 'Tôn trọng tập quán của đối phương', isCorrect: true },
        { id: 'b', text: 'Khăng khăng ý mình là đúng', isCorrect: false },
        { id: 'c', text: 'Cố gắng thay đổi người khác', isCorrect: false },
        { id: 'd', text: 'Không quan tâm', isCorrect: false },
      ]},
      { id: 2, question: 'Cách nào giúp tránh hiểu lầm văn hóa?', options: [
        { id: 'a', text: 'Tìm hiểu trước về nền văn hóa', isCorrect: true },
        { id: 'b', text: 'Châm biếm', isCorrect: false },
        { id: 'c', text: 'Không khen ngợi', isCorrect: false },
        { id: 'd', text: 'Tránh đề tài', isCorrect: false },
      ]},
      { id: 3, question: 'Kỹ năng nào quan trọng trong đối thoại xuyên văn hóa?', options: [
        { id: 'a', text: 'Lắng nghe', isCorrect: true },
        { id: 'b', text: 'Giải thích một chiều', isCorrect: false },
        { id: 'c', text: 'Tránh tranh luận', isCorrect: false },
        { id: 'd', text: 'Giữ gương mặt lạnh lùng', isCorrect: false },
      ]},
    ],
  },
  '個人の興味とライフスタイル': {
    title: 'Bài kiểm tra Sở thích & Lối sống',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Câu nào dùng để nói về sở thích?', options: [
        { id: 'a', text: 'Tôi thích xem phim.', isCorrect: true },
        { id: 'b', text: 'Tôi không phải là phim.', isCorrect: false },
        { id: 'c', text: 'Xem phim thích', isCorrect: false },
        { id: 'd', text: 'Thích phim tôi', isCorrect: false },
      ]},
      { id: 2, question: 'Câu nào hợp lý khi hỏi về lối sống?', options: [
        { id: 'a', text: 'Bạn làm gì vào ngày nghỉ?', isCorrect: true },
        { id: 'b', text: 'Thời tiết hôm nay thế nào?', isCorrect: false },
        { id: 'c', text: 'Hôm qua bạn ăn gì?', isCorrect: false },
        { id: 'd', text: 'Màu yêu thích của bạn là gì?', isCorrect: false },
      ]},
      { id: 3, question: 'Câu nào tự nhiên khi giới thiệu sở thích?', options: [
        { id: 'a', text: 'Cuối tuần tôi đi leo núi.', isCorrect: true },
        { id: 'b', text: 'Tôi thích ngủ mỗi ngày.', isCorrect: false },
        { id: 'c', text: 'Ăn đi', isCorrect: false },
        { id: 'd', text: 'Đọc thích tôi', isCorrect: false },
      ]},
    ],
  },
  '地球環境と持続可能性': {
    title: 'Bài kiểm tra Môi trường & Bền vững',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Từ nào liên quan đến phát triển bền vững?', options: [
        { id: 'a', text: 'Năng lượng tái tạo', isCorrect: true },
        { id: 'b', text: 'Giải trí', isCorrect: false },
        { id: 'c', text: 'Thèm ăn', isCorrect: false },
        { id: 'd', text: 'Ngủ', isCorrect: false },
      ]},
      { id: 2, question: 'Mục đích của tái chế là gì?', options: [
        { id: 'a', text: 'Tận dụng nguồn lực hiệu quả', isCorrect: true },
        { id: 'b', text: 'Vứt bỏ nhiều hơn', isCorrect: false },
        { id: 'c', text: 'Tăng ô nhiễm', isCorrect: false },
        { id: 'd', text: 'Phá sản phẩm', isCorrect: false },
      ]},
      { id: 3, question: 'Cá nhân có thể làm gì để bảo vệ môi trường?', options: [
        { id: 'a', text: 'Phân loại rác', isCorrect: true },
        { id: 'b', text: 'Lãng phí nước', isCorrect: false },
        { id: 'c', text: 'Không tắt điện', isCorrect: false },
        { id: 'd', text: 'Đi xe hơi mọi lúc', isCorrect: false },
      ]},
    ],
  },
  '生活コミュニケーション': {
    title: 'Bài kiểm tra Giao tiếp đời sống',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Câu chào nào phù hợp nhất?', options: [
        { id: 'a', text: 'Chào buổi sáng.', isCorrect: true },
        { id: 'b', text: 'Tạm biệt?', isCorrect: false },
        { id: 'c', text: 'Cảm ơn?', isCorrect: false },
        { id: 'd', text: 'Xin lỗi?', isCorrect: false },
      ]},
      { id: 2, question: 'Câu nào dùng khi mua đồ?', options: [
        { id: 'a', text: 'Cho tôi cái này.', isCorrect: true },
        { id: 'b', text: 'Tôi trả lại cái này.', isCorrect: false },
        { id: 'c', text: 'Tôi phá cái này.', isCorrect: false },
        { id: 'd', text: 'Tôi vứt cái này đi.', isCorrect: false },
      ]},
      { id: 3, question: 'Câu nào dùng để hỏi đường?', options: [
        { id: 'a', text: '... ở đâu?', isCorrect: true },
        { id: 'b', text: '... bạn ăn không?', isCorrect: false },
        { id: 'c', text: '... bạn mua không?', isCorrect: false },
        { id: 'd', text: '... là ai?', isCorrect: false },
      ]},
    ],
  },
  '日常文法とカジュアル表現': {
    title: 'Bài kiểm tra Ngữ pháp đời thường & Cách nói',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Cách dùng “〜ね” trong hội thoại là gì?', options: [
        { id: 'a', text: 'Diễn tả sự đồng ý hoặc cảm thông', isCorrect: true },
        { id: 'b', text: 'Ra lệnh', isCorrect: false },
        { id: 'c', text: 'Thể hiện lòng biết ơn', isCorrect: false },
        { id: 'd', text: 'Mạnh câu phủ định', isCorrect: false },
      ]},
      { id: 2, question: '“〜かな” biểu thị điều gì?', options: [
        { id: 'a', text: 'Sự suy đoán hoặc nghi vấn', isCorrect: true },
        { id: 'b', text: 'Mệnh lệnh mạnh', isCorrect: false },
        { id: 'c', text: 'Thì quá khứ', isCorrect: false },
        { id: 'd', text: 'Mong muốn', isCorrect: false },
      ]},
      { id: 3, question: 'Rút gọn trong hội thoại thường là gì?', options: [
        { id: 'a', text: '〜ている → 〜てる', isCorrect: true },
        { id: 'b', text: '〜ます → 〜ましょう', isCorrect: false },
        { id: 'c', text: '〜ません → 〜ます', isCorrect: false },
        { id: 'd', text: '〜た → 〜だ', isCorrect: false },
      ]},
    ],
  },
  'キャリアと就職活動': {
    title: 'Bài kiểm tra Nghề nghiệp & Tìm việc',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Câu giới thiệu bản thân nào phù hợp trong phỏng vấn?', options: [
        { id: 'a', text: 'Rất vui được gặp, tôi là ...', isCorrect: true },
        { id: 'b', text: 'Chào anh, công việc thế nào?', isCorrect: false },
        { id: 'c', text: 'Xin chào, bạn bao nhiêu tuổi?', isCorrect: false },
        { id: 'd', text: 'Tên bạn là gì?', isCorrect: false },
      ]},
      { id: 2, question: 'Thông tin nào nên viết trong sơ yếu lý lịch?', options: [
        { id: 'a', text: 'Quá trình học tập và kinh nghiệm làm việc', isCorrect: true },
        { id: 'b', text: 'Thông tin liên hệ của bạn bè', isCorrect: false },
        { id: 'c', text: 'Sở thích bí mật', isCorrect: false },
        { id: 'd', text: 'Món ăn ưa thích', isCorrect: false },
      ]},
      { id: 3, question: 'Thái độ nào phù hợp khi phỏng vấn?', options: [
        { id: 'a', text: 'Lịch sự và bình tĩnh', isCorrect: true },
        { id: 'b', text: 'Nói nhanh và hấp tấp', isCorrect: false },
        { id: 'c', text: 'Không nói gì', isCorrect: false },
        { id: 'd', text: 'Chê bai', isCorrect: false },
      ]},
    ],
  },
  '旅行と移動': {
    title: 'Bài kiểm tra Du lịch & Di chuyển',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Câu nào dùng khi mua vé tàu?', options: [
        { id: 'a', text: 'Cho tôi một vé Shinkansen.', isCorrect: true },
        { id: 'b', text: 'Tôi sẽ chơi ở đây.', isCorrect: false },
        { id: 'c', text: 'Hôm nay tôi nghỉ.', isCorrect: false },
        { id: 'd', text: 'Tôi muốn đồ ăn.', isCorrect: false },
      ]},
      { id: 2, question: 'Khi được hỏi đường, đáp án phù hợp là gì?', options: [
        { id: 'a', text: 'Đi thẳng rồi rẽ trái.', isCorrect: true },
        { id: 'b', text: 'Tôi không biết.', isCorrect: false },
        { id: 'c', text: 'Về nhà đi.', isCorrect: false },
        { id: 'd', text: 'Hãy đến đây ngay.', isCorrect: false },
      ]},
      { id: 3, question: 'Từ nào thường dùng ở sân bay?', options: [
        { id: 'a', text: 'Cửa lên máy bay', isCorrect: true },
        { id: 'b', text: 'Giỏ hàng', isCorrect: false },
        { id: 'c', text: 'Máy giặt', isCorrect: false },
        { id: 'd', text: 'Thư viện', isCorrect: false },
      ]},
    ],
  },
  '飲食店でのコミュニケーション': {
    title: 'Bài kiểm tra Giao tiếp nhà hàng',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Câu nào phù hợp khi gọi món?', options: [
        { id: 'a', text: 'Cho tôi xem menu.', isCorrect: true },
        { id: 'b', text: 'Tôi sẽ ngủ ở đây.', isCorrect: false },
        { id: 'c', text: 'Xin hãy phá cái này.', isCorrect: false },
        { id: 'd', text: 'Đi ra kia đi.', isCorrect: false },
      ]},
      { id: 2, question: 'Câu nào dùng để hỏi gợi ý đồ uống?', options: [
        { id: 'a', text: 'Bạn gợi ý gì?', isCorrect: true },
        { id: 'b', text: 'Nhanh lên.', isCorrect: false },
        { id: 'c', text: 'Không ngon.', isCorrect: false },
        { id: 'd', text: 'Tôi về rồi.', isCorrect: false },
      ]},
      { id: 3, question: 'Câu nào dùng khi thanh toán?', options: [
        { id: 'a', text: 'Xin tính tiền giúp tôi.', isCorrect: true },
        { id: 'b', text: 'Tôi ngủ ở đây.', isCorrect: false },
        { id: 'c', text: 'Tôi nấu ăn.', isCorrect: false },
        { id: 'd', text: 'Dọn bàn giúp tôi.', isCorrect: false },
      ]},
    ],
  },
  '社会構造と経済発展': {
    title: 'Bài kiểm tra Xã hội & Kinh tế',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Từ nào liên quan đến phát triển kinh tế?', options: [
        { id: 'a', text: 'Hạ tầng', isCorrect: true },
        { id: 'b', text: 'Thời gian rảnh', isCorrect: false },
        { id: 'c', text: 'Sở thích', isCorrect: false },
        { id: 'd', text: 'Cách nấu ăn', isCorrect: false },
      ]},
      { id: 2, question: 'Trong tranh luận về cấu trúc xã hội, yếu tố nào quan trọng?', options: [
        { id: 'a', text: 'Phân phối thu nhập', isCorrect: true },
        { id: 'b', text: 'Nguyên liệu nấu ăn', isCorrect: false },
        { id: 'c', text: 'Thể loại âm nhạc', isCorrect: false },
        { id: 'd', text: 'Dự báo thời tiết', isCorrect: false },
      ]},
      { id: 3, question: 'Chính sách nào thường được chú ý?', options: [
        { id: 'a', text: 'Giáo dục và việc làm', isCorrect: true },
        { id: 'b', text: 'Điện ảnh', isCorrect: false },
        { id: 'c', text: 'Truyện tranh', isCorrect: false },
        { id: 'd', text: 'Trò chơi', isCorrect: false },
      ]},
    ],
  },
  '人工知能とテクノロジーの発展': {
    title: 'Bài kiểm tra AI & Công nghệ',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Ví dụ ứng dụng của AI là gì?', options: [
        { id: 'a', text: 'Xe tự lái', isCorrect: true },
        { id: 'b', text: 'Ăn cơm', isCorrect: false },
        { id: 'c', text: 'Đi dạo', isCorrect: false },
        { id: 'd', text: 'Ngủ', isCorrect: false },
      ]},
      { id: 2, question: 'Điểm nào quan trọng trong đạo đức AI?', options: [
        { id: 'a', text: 'Loại bỏ thiên kiến', isCorrect: true },
        { id: 'b', text: 'Sử dụng dữ liệu không xin phép', isCorrect: false },
        { id: 'c', text: 'Thiếu minh bạch', isCorrect: false },
        { id: 'd', text: 'Chống độc quyền', isCorrect: false },
      ]},
      { id: 3, question: 'Công nghệ thay đổi điều gì?', options: [
        { id: 'a', text: 'Cách làm việc', isCorrect: true },
        { id: 'b', text: 'Mùa trong năm', isCorrect: false },
        { id: 'c', text: 'Kích thước Trái Đất', isCorrect: false },
        { id: 'd', text: 'Chiều cao núi', isCorrect: false },
      ]},
    ],
  },
  'ベトナムの文化と音楽': {
    title: 'Bài kiểm tra Văn hóa & Âm nhạc Việt Nam',
    totalQuestions: 3,
    timeLimit: 600,
    questions: [
      { id: 1, question: 'Nhạc cụ truyền thống Việt Nam là gì?', options: [
        { id: 'a', text: 'Đàn bầu', isCorrect: true },
        { id: 'b', text: 'Guitar', isCorrect: false },
        { id: 'c', text: 'Violin', isCorrect: false },
        { id: 'd', text: 'Trống điện tử', isCorrect: false },
      ]},
      { id: 2, question: 'Yếu tố nào quan trọng trong lễ hội?', options: [
        { id: 'a', text: 'Truyền thống và cộng đồng', isCorrect: true },
        { id: 'b', text: 'Chỉ là ngày nghỉ', isCorrect: false },
        { id: 'c', text: 'Mua sắm hàng ngày', isCorrect: false },
        { id: 'd', text: 'Giờ ngủ', isCorrect: false },
      ]},
      { id: 3, question: 'Đặc điểm của nhạc Việt Nam là gì?', options: [
        { id: 'a', text: 'Giai điệu du dương', isCorrect: true },
        { id: 'b', text: 'Luôn có tiết tấu nhanh', isCorrect: false },
        { id: 'c', text: 'Không có lời', isCorrect: false },
        { id: 'd', text: 'Không có giai điệu', isCorrect: false },
      ]},
    ],
  },
};

const fallbackTestData: TopicTestData = {
  title: 'Bài kiểm tra tổng hợp',
  totalQuestions: 4,
  timeLimit: 600,
  questions: [
    {
      id: 1,
      question: 'Chọn cụm từ phù hợp nhất cho câu sau.',
      options: [
        { id: 'a', text: 'Kinh tế', isCorrect: true },
        { id: 'b', text: 'Văn hóa', isCorrect: false },
        { id: 'c', text: 'Xã hội', isCorrect: false },
        { id: 'd', text: 'Chính trị', isCorrect: false },
      ],
    },
    {
      id: 2,
      question: 'Ý nghĩa của từ này là gì?',
      options: [
        { id: 'a', text: 'Quan trọng', isCorrect: false },
        { id: 'b', text: 'Có hiệu quả', isCorrect: true },
        { id: 'c', text: 'Nổi tiếng', isCorrect: false },
        { id: 'd', text: 'Có hại', isCorrect: false },
      ],
    },
    {
      id: 3,
      question: 'Chọn câu đúng về ngữ pháp.',
      options: [
        { id: 'a', text: 'Tôi sẽ đi học vào ngày mai.', isCorrect: true },
        { id: 'b', text: 'Tôi sẽ đi học vào ngày mai không.', isCorrect: false },
        { id: 'c', text: 'Tôi đi học vào ngày mai?', isCorrect: false },
        { id: 'd', text: 'Ngày mai tôi đi học.', isCorrect: false },
      ],
    },
    {
      id: 4,
      question: 'Chọn từ trái nghĩa với từ sau.',
      options: [
        { id: 'a', text: 'Lớn', isCorrect: true },
        { id: 'b', text: 'Mới', isCorrect: false },
        { id: 'c', text: 'Cũ', isCorrect: false },
        { id: 'd', text: 'Yêu thích', isCorrect: false },
      ],
    },
  ],
};

function getLessonTestData(lessonName: string | undefined): TopicTestData {
  const normalized = lessonName ? decodeURIComponent(lessonName) : '総合';
  return topicQuestionBanks[normalized] || fallbackTestData;
}

export default function LevelTest() {
  const navigate = useNavigate();
  const { lessonName: routeLessonName } = useParams<{ lessonName?: string }>();
  const mockTestData = useMemo(() => getLessonTestData(routeLessonName), [routeLessonName]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
  const [timeLeft, setTimeLeft] = useState(mockTestData.timeLimit);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(mockTestData.timeLimit);
  }, [mockTestData]);

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
      if (window.confirm('Bạn có muốn dừng bài kiểm tra và quay về trang đánh giá trình độ không?')) {
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
    alert(`Hoàn thành bài kiểm tra!\nĐiểm: ${score}%\nĐúng: ${correctCount}/${mockTestData.totalQuestions}`);
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
          {/* Question Header */}
          <div className="question-header">
            <span className="question-number">Câu {currentQuestion + 1}</span>
            <p className="question-instruction">
              {currentQ?.question || '質問が読み込まれていません。'}
            </p>
          </div>

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
