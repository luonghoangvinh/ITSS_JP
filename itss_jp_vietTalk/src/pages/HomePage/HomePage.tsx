import React from 'react';
import { motion } from "framer-motion";
import {
    Search, Bell, Languages, UserCircle, Flame,
    ArrowRight, Volume2, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeScreenProps {
    onGoToLesson: () => void;
}

function HomeScreen() {
    const navigate = useNavigate();
    
    return (<div className="space-y-6 pb-20">
        {/* Top Header */}
        <div className="flex items-center justify-between">
            <div className="relative w-80">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="レッスンや単語を検索.."
                    className="w-full bg-[#FCF2F2] rounded-full py-3 pl-14 pr-6 outline-none text-xs font-bold italic border border-[#FFE4E4]"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="p-2 text-gray-500 hover:bg-[#FFF1F1] rounded-full transition-all relative">
                    <div className="flex items-center gap-1.5 bg-white border border-[#FFE4E4] px-3 py-1.5 rounded-full shadow-sm">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#B91C1C] rounded-full border border-white"></span>
                        <span className="text-xs font-black italic text-red-600">3</span>
                    </div>
                </button>
                <button className="p-2 text-gray-500 hover:bg-[#FFF1F1] rounded-full transition-colors">
                    <Languages size={20} />
                </button>
                <button className="p-1 border-2 border-[#FFE4E4] rounded-full bg-white shadow-sm">
                    <UserCircle size={28} className="text-gray-400" />
                </button>
            </div>
        </div>

        {/* Hero Card with Level 12 */}
        <div className="relative bg-[#FCF2F2] rounded-[3rem] p-12 border border-[#FFE4E4] overflow-hidden flex items-center justify-between gap-8 shadow-sm mt-4">
            <div className="flex-1 space-y-6 z-10 text-left">
                <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#B91C1C] text-[10px] font-black px-4 py-1.5 rounded-full w-fit flex items-center gap-1 italic shadow-sm">
                    <span>★</span>
                    <span>レベル12 : 群島</span>
                </div>

                <h2 className="text-5xl font-black text-gray-900 leading-tight italic tracking-tighter">
                    おはようございます、<br />
                    アレックス！<br />
                    <span className="text-[#B91C1C]">続きを始めましょうか？</span>
                </h2>

                <p className="text-xs font-bold text-gray-500 italic max-w-lg leading-relaxed">
                    メコンデルタ文化モジュールの学習は65%完了しています。今日は「郷土料理」のユニットを終わらせましょう。
                </p>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={()=>{navigate("/home/levelselect");}}
                        className="bg-[#B91C1C] text-white px-10 py-3.5 rounded-[2rem] font-black text-xs italic hover:bg-[#991B1B] transition-all shadow-lg shadow-red-200"
                    >
                        学習を続ける
                    </button>
                    <button className="bg-white text-gray-700 border border-[#FFE4E4] px-10 py-3.5 rounded-[2rem] font-black text-xs italic hover:bg-gray-50 transition-all shadow-sm">
                        学習ルートを見る
                    </button>
                </div>
            </div>

            {/* Hero Conical Hat Artwork */}
            <div className="relative w-80 h-80 rounded-[2.5rem] overflow-hidden shadow-2xl shrink-0 border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                    src="/src/assets/Dragon-Conical-Hat-1-600x600.jpg"
                    alt="Conical Hat Painting"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* Metrics / Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Streak Block */}
            <div className="bg-white rounded-[2.5rem] border border-[#FFE4E4] p-8 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#FCF2F2] rounded-2xl text-[#B91C1C] shadow-sm"><Flame size={24} /></div>
                    <span className="text-[#C2410C] font-black text-3xl italic tracking-tighter">14</span>
                </div>
                <div className="space-y-4 mt-8">
                    <p className="text-sm font-black text-gray-900 italic">学習ストリーク</p>
                    <div className="flex gap-1.5">
                        {[...Array(7)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 flex-1 rounded-full ${i < 6 ? 'bg-[#92400E] shadow-sm' : 'bg-[#E5E7EB]'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Learn Now Block */}
            <div
                onClick={()=>{navigate("/home/levelselect");}}
                className="bg-[#B91C1C] rounded-[2.5rem] p-8 text-white cursor-pointer hover:bg-[#991B1B] transition-all relative overflow-hidden group shadow-lg flex flex-col justify-between"
            >
                <h3 className="text-2xl font-black italic tracking-tighter mt-2 text-left">今すぐ学ぶ</h3>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#B91C1C] shadow-md group-hover:scale-110 transition-transform mt-8 ml-auto">
                    <ArrowRight size={22} />
                </div>
            </div>

            {/* Dictionary Block */}
            <div className="bg-[#FCF2F2] rounded-[2.5rem] border border-[#FFE4E4] p-8 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-gray-900 italic tracking-tighter">辞書</h3>
                </div>
                <div className="space-y-3 mt-6">
                    <div className="flex justify-between items-center px-4 py-2 bg-white border border-[#FFE4E4]/50 rounded-2xl text-[10px] shadow-sm">
                        <span className="font-black text-[#B91C1C] italic">Phở</span>
                        <span className="text-gray-400 font-bold italic">フォー</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-white border border-[#FFE4E4]/50 rounded-2xl text-[10px] shadow-sm">
                        <span className="font-black text-[#B91C1C] italic">Cảm ơn</span>
                        <span className="text-gray-400 font-bold italic text-right line-clamp-1">ありがとうございます</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Lessons */}
        <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">
                    最近のレッスン
                </h3>
                <button className="text-[#B91C1C] hover:underline font-black flex items-center gap-1 text-xs italic">
                    すべて見る
                    <ChevronRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: '屋台料理',
                        tag: '食べ物と文化',
                        progress: '80%完了',
                        img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600',
                        progressVal: 80,
                        desc: '屋台料理を注文したり、理解したりするための語彙を学びましょう。',
                        tagColor: 'bg-[#FFF1F1] text-[#D97706]'
                    },
                    {
                        title: '市場での値段交渉',
                        tag: 'ショッピング',
                        progress: '未開始',
                        img: 'https://images2.thanhnien.vn/528068263637045248/2023/11/26/img20231126195329-17010033043001958762155.jpg',
                        progressVal: 0,
                        desc: '丁寧な交渉 of コツ or 現地での価格に関する数字表現を身につけましょう。',
                        tagColor: 'bg-orange-50 text-orange-600'
                    },
                    {
                        title: '自然の美しさ',
                        tag: '旅行',
                        progress: '100%完了',
                        img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600',
                        progressVal: 100,
                        desc: 'サバから広がるベトナムの息をのむような風景を表現しましょう。',
                        tagColor: 'bg-emerald-50 text-emerald-600'
                    },
                ].map((lesson, idx) => (
                    <div key={idx} className="bg-white rounded-[2.5rem] border border-[#FFE4E4] overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all shadow-sm cursor-pointer flex flex-col justify-between">
                        <div>
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" />
                                <div className={`absolute top-4 left-4 ${lesson.tagColor} px-3 py-1 rounded-full text-[8px] font-black italic border border-white/60 shadow-sm`}>
                                    {lesson.tag}
                                </div>
                                <div className="absolute top-4 right-4 text-white text-[9px] font-black italic bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
                                    {idx === 0 ? '01:45' : idx === 1 ? '03:10' : '02:50'}
                                </div>
                            </div>
                            <div className="p-6 space-y-3 text-left">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-black text-gray-900 text-sm italic tracking-tighter">{lesson.title}</h4>
                                    <span className={`text-[10px] font-black italic ${lesson.progress.includes('100') || lesson.progress.includes('80') ? 'text-emerald-600' : 'text-[#B91C1C]'}`}>
                                        {lesson.progress}
                                    </span>
                                </div>
                                <p className="text-[10px] leading-relaxed font-bold text-gray-400 italic line-clamp-2">
                                    {lesson.desc}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 pt-0 space-y-4">
                            <div className="w-full h-1.5 bg-[#FCF2F2] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${lesson.progressVal}%` }}
                                    className={`h-full ${lesson.progressVal === 100 ? 'bg-emerald-500' : 'bg-orange-400'}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Cultural Insight Card */}
        <div className="bg-[#FFF9F2] rounded-[3rem] border border-[#FFEEDD] p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm mt-8">
            <div className="flex-1 space-y-5 text-left">
                <h3 className="text-3xl font-black text-gray-900 italic tracking-tighter">
                    インサイト：「ơi」の意味
                </h3>
                <p className="text-xs font-bold text-gray-600 leading-relaxed max-w-2xl italic">
                    ベトナム文化において、「ơi」という助詞は単なる呼びかけ以上のものです。それは言葉によるハグのようなものであり、話し手同士の敬意や親しさを繋ぐ架け橋です。家族に対して使う場合と友達に対して使う場合の違いを学びましょう。
                </p>
                <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-[#D97706] italic">本日, 2.4k人がこれを学びました。</span>
                </div>
            </div>

            {/* Accent White Playback Card */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-[#FFEEDD]/60 flex items-center gap-5 w-full lg:w-96 flex-shrink-0 relative">
                <button className="w-14 h-14 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-full flex items-center justify-center shadow-lg shadow-red-200 transition-transform active:scale-95 flex-shrink-0">
                    <Volume2 size={24} fill="currentColor" />
                </button>
                <div className="space-y-1 text-left">
                    <p className="font-black text-xl text-[#B91C1C] italic tracking-tighter">Mẹ ơi!</p>
                    <p className="text-[10px] font-bold text-gray-400 italic font-medium">ねえ、お母さん！（丁寧／親しみを込めて）</p>
                </div>
            </div>
        </div>
    </div>
    )
};

export default HomeScreen;