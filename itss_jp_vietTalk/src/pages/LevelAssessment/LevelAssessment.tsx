import { useState, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import './LevelAssessment.css';

// Dữ liệu mẫu giống ảnh
const mockData = {
  completedTests: 3,
  averageScore: 83,
  audioSpeed: 1.1,
  progress: {
    overall: 68,
    listening: 85,
    vocabulary: 61,
  },
  items: [
    { id: '6', title: 'デジタル社会テスト', lessonName: 'テクノロジーと現代生活', icon: 'D', topic: 'テクノロジーと現代生活', status: 'inProgress', progress: 40, buttonLabel: 'テストを受ける', buttonColor: 'bg-[#0f6e56]' },
    { id: '7', title: '日本文化理解テスト', lessonName: '異文化コミュニケーション', icon: 'J', topic: '異文化コミュニケーション', status: 'inProgress', progress: 25, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '12', title: '趣味と活動テスト', lessonName: '個人の興味とライフスタイル', icon: 'H', topic: '個人の興味とライフスタイル', status: 'needsReview', progress: 10, buttonLabel: 'テストを受ける', buttonColor: 'bg-rose-500' },
    { id: '8', title: '環境問題テスト', lessonName: '地球環境と持続可能性', icon: 'E', topic: '地球環境と持続可能性', status: 'completed', progress: 100, buttonLabel: 'テストを受ける', buttonColor: 'bg-[#0f6e56]' },
    { id: '11', title: '日常生活の会話テスト', lessonName: '生活コミュニケーション', icon: 'L', topic: '生活コミュニケーション', status: 'inProgress', progress: 55, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '1', title: '文法コーヒーテスト', lessonName: '日常文法とカジュアル表現', icon: 'G', topic: '日常文法とカジュアル表現', status: 'inProgress', progress: 20, buttonLabel: 'テストを受ける', buttonColor: 'bg-rose-500' },
    { id: '5', title: '仕事の面接テスト', lessonName: 'キャリアと就職活動', icon: 'C', topic: 'キャリアと就職活動', status: 'inProgress', progress: 35, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '4', title: '旅行文法テスト', lessonName: '旅行と移動', icon: 'T', topic: '旅行と移動', status: 'inProgress', progress: 50, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '3', title: 'カフェ会話テスト', lessonName: '飲食店でのコミュニケーション', icon: 'F', topic: '飲食店でのコミュニケーション', status: 'completed', progress: 100, buttonLabel: 'テストを受ける', buttonColor: 'bg-[#0f6e56]' },
    { id: '9', title: '経済と社会テスト', lessonName: '社会構造と経済発展', icon: 'S', topic: '社会構造と経済発展', status: 'inProgress', progress: 30, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '10', title: 'AIと未来テスト', lessonName: '人工知能とテクノロジーの発展', icon: 'A', topic: '人工知能とテクノロジーの発展', status: 'inProgress', progress: 45, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
    { id: '2', title: '伝統音楽テスト', lessonName: 'ベトナムの文化と音楽', icon: 'M', topic: 'ベトナムの文化と音楽', status: 'inProgress', progress: 15, buttonLabel: 'テストを受ける', buttonColor: 'bg-amber-500' },
  ],
};

function statusLabel(status: string) {
  switch (status) {
    case 'completed': return '完了済み';
    case 'inProgress': return '進行中';
    case 'needsReview': return '要復習';
    default: return '未定義';
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case 'completed': return 'bg-emerald-100 text-emerald-700';
    case 'inProgress': return 'bg-amber-100 text-amber-700';
    case 'needsReview': return 'bg-rose-100 text-rose-700';
    default: return 'bg-slate-100 text-slate-600';
  }
}

function progressBarClass(status: string) {
  switch (status) {
    case 'completed': return 'bg-[#0f6e56]';
    case 'inProgress': return 'bg-amber-400';
    case 'needsReview': return 'bg-rose-400';
    default: return 'bg-slate-400';
  }
}

function getButtonProps(status: string) {
  switch (status) {
    case 'completed':
      return { label: 'テストを受ける', color: 'bg-[#0f6e56]' };
    case 'inProgress':
      return { label: '学習を続ける', color: 'bg-amber-500' };
    case 'needsReview':
      return { label: '復習する', color: 'bg-rose-500' };
    default:
      return { label: 'テストを受ける', color: 'bg-slate-400' };
  }
}

export default function LevelAssessment() {
  const navigate = useNavigate();
  const [speed, setSpeed] = useState(mockData.audioSpeed);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredItems = mockData.items.filter(item =>
    selectedFilter === 'all' ? true : item.status === selectedFilter
  );

  const handleSpeedChange = (value: SetStateAction<number>) => setSpeed(value);

  const handleButtonClick = (lessonName: string, progress: number) => {
    if (progress === 100) {
      navigate(`/home/leveltest/${encodeURIComponent(lessonName)}`);
    } else {
      navigate('/home/lessons');
    }
  };

  return (
    <div className="level-assessment-container">
      <div className="level-assessment-content">
        {/* Header với logo và logout */}
        <div className="flex justify-between items-center">
          
        </div>

        {/* Header row: title + completed + average */}
        <div className="grid grid-cols-[1fr_auto_auto] items-start gap-4">
          <div className="la-title-section space-y-1">
            <p className="text-sm font-medium text-[#B51621]">レベル判定画面</p>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#B51621]">レベル判定一覧</h1>
          </div>
          <div className="la-stat-card rounded-2xl bg-white px-6 py-5 shadow-sm border border-slate-200 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">COMPLETED</p>
            <p className="text-4xl font-black text-slate-900 leading-none">{mockData.completedTests}<span className="text-xl font-semibold text-slate-400"> / 10</span></p>
            <p className="text-[10px] text-slate-400 mt-2">実装済みテスト合計</p>
          </div>
          <div className="la-stat-card rounded-2xl bg-white px-6 py-5 shadow-sm border border-slate-200 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">AVERAGE</p>
            <p className="text-4xl font-black text-slate-900 leading-none">{mockData.averageScore}<span className="text-xl font-semibold text-slate-400">/100</span></p>
            <p className="text-[10px] text-slate-400 mt-2">平均スコア</p>
          </div>
        </div>

        {/* Second row: audio speed (left) and progress summary (right) - equal height */}
        <div className="grid grid-cols-[1fr_auto] gap-5 items-stretch mt-3">
          <div className="la-speed-card text-[10px] text-center rounded-2xl bg-white border border-slate-200 p-5 shadow-sm h-full">
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-bold text-slate-800">音声スピード設定</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">Global control</span>
              </div>

              <div className="text-center my-3">
                <div className="text-5xl font-black text-[#B51621]">{speed.toFixed(1)}</div>
              </div>

              <div className="ticks flex justify-between text-[12px] text-slate-400 px-2">
                <span>0.5x</span>
                <span>0.7x</span>
                <span>0.9x</span>
                <span>1.1x</span>
                <span>1.3x</span>
                <span>1.5x</span>
              </div>

              <div className="my-2 px-2">
                <input type="range" min={0.5} max={1.5} step={0.1} value={speed} onChange={e => handleSpeedChange(Number(e.target.value))} className="w-full la-range" />
              </div>

              <p className="text-xs text-slate-400 mt-2">すべてのテストとレッスンに適用される再生速度を調節します。</p>
            </div>

          <div className="la-progress-card rounded-2xl p-2.5 text-white shadow-xl flex flex-col justify-between h-full">
            <div className="px-2">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">PROGRESS SUMMARY</p>
              <p className="text-base font-bold leading-snug mt-1">今週の学習<br />進捗</p>
            </div>
            <div className="mt-3 px-2">
              <div className="flex items-baseline justify-between">
                <p className="la-overall-percent text-5xl font-black">{mockData.progress.overall}%</p>
                <span className="text-[10px] uppercase opacity-70">PROGRESS</span>
              </div>
              <p className="la-overall-caption text-[10px] opacity-60 mb-4">overall completion</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-white/80 mb-1"><span>Listening</span><span>{mockData.progress.listening}%</span></div>
                  <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full la-fill-yellow rounded-full" style={{ width: `${mockData.progress.listening}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/80 mb-1"><span>Vocabulary</span><span>{mockData.progress.vocabulary}%</span></div>
                  <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full la-fill-white rounded-full" style={{ width: `${mockData.progress.vocabulary}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách test & lesson */}
        <div className="la-list rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h2 className="text-lg font-black text-slate-900">テスト&amp;レッスン一覧</h2>
            <div className="la-filter-btns flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'すべて', activeClass: 'bg-[#0f6e56] text-white', inactiveClass: 'bg-slate-100 text-slate-600' },
                { key: 'completed', label: 'Completed', activeClass: 'bg-emerald-600 text-white', inactiveClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
                { key: 'inProgress', label: 'In progress', activeClass: 'bg-amber-500 text-white', inactiveClass: 'bg-amber-50 text-amber-700 border border-amber-200' },
                { key: 'needsReview', label: 'Needs review', activeClass: 'bg-rose-500 text-white', inactiveClass: 'bg-rose-50 text-rose-700 border border-rose-200' },
              ].map(f => (
                <button key={f.key} onClick={() => setSelectedFilter(f.key)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${selectedFilter === f.key ? f.activeClass : f.inactiveClass}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div key={item.id} className="la-item flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 hover:bg-slate-100/60 transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm ${item.status === 'completed' ? 'bg-[#0f6e56]' : item.status === 'inProgress' ? 'bg-amber-500' : 'bg-rose-500'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-[180px]">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">{item.lessonName}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBadgeClass(item.status)}`}>{statusLabel(item.status)}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">進捗率 {item.progress}%</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                  <div className="w-36 h-2 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${progressBarClass(item.status)}`} style={{ width: `${item.progress}%` }} /></div>
                  <span className="text-xs text-slate-500 w-8 text-right">{item.progress}%</span>
                </div>
                {(() => {
                  const btn = getButtonProps(item.status);
                  return (
                    <button onClick={() => handleButtonClick(item.lessonName, item.progress)} className={`rounded-full px-5 py-2 text-xs font-semibold text-white transition shrink-0 shadow-sm flex items-center gap-1 ${btn.color} hover:brightness-90`}>
                      <span>{btn.label}</span>
                      <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">{item.progress}%</span>
                    </button>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}