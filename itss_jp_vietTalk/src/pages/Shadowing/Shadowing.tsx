import { useEffect, useRef, useState } from "react";
// simple animated bars implemented with state + CSS transitions (no framer-motion)
import { Play, Mic, RotateCcw, Pause } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
//import { fetchDefaultLesson, submitRecording, fetchStats } from "../../api/shadowing";
import SrtParser2 from 'srt-parser-2';
import timeToSeconds from "../../utils/timeToSeconds";
//import type { Lesson, Phrase } from "../../api/shadowing";

const ShadowingScreen = () => {

  const location = useLocation();
  const [lesson, setLesson] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 40 }, () => Math.random() * 80 + 20));
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lessonId = location.state?.lessonId;
  const [speed, setSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);

  const [subtitle, setSubtitle] = useState<any[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [subtitleJP, setSubtitleJP] = useState<any[]>([]);
  const [currentSubtitleJP, setCurrentSubtitleJP] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || '';
  /*useEffect(() => {
    // load default lesson
    fetchDefaultLesson().then(l => setLesson(l)).catch(() => {
      // fallback mock
      setLesson({
        id: 'demo', title: 'Hanoi Street Food Tour', subtitle: 'Lesson 12: Ordering Bun Cha', phrases: [
          { id: 'p1', jpText: 'ブンチャーを一つください。', viText: 'Cho tôi một suất bún chả.', audioUrl: '' }
        ]
      });
    });
  }, []);*/
  useEffect(() => {
    if (lessonId) {
      fetch(`${API_BASE}/lessons/${lessonId}`)
        .then(res => res.json())
        .then(data => {
          setLesson(data);
        })
        .catch(err => console.error(err));
    }

  }, [lessonId]);

  useEffect(() => {
    if (lesson != null) {
      const fetchSubtitle = async () => {

        const res = await fetch(lesson.lessonContent);
        const srtText = await res.text();
        const parser = new SrtParser2();
        const parsed = parser.fromSrt(srtText);

        const resJP = await fetch(lesson.lessonContentJp);
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
  }, [lesson])



  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const preSubtitle=currentSubtitle;

      const currentText = subtitle.find((sub) =>
        current >= sub.startTime && current <= sub.endTime
      )
      const currentTextJP = subtitleJP.find((sub) =>
        current >= sub.startTime && current <= sub.endTime
      )
      if(preSubtitle!=currentText.text) setCurrentIndex(currentIndex+1);
      setCurrentSubtitle(currentText?.text || "");
      setCurrentSubtitleJP(currentTextJP?.text || "");

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


  useEffect(() => {
    return () => {
      const tracks = mediaRecorderRef.current?.stream ? mediaRecorderRef.current.stream.getTracks() : [];
      tracks.forEach(t => t.stop());
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBars(b => b.map(() => Math.random() * 80 + 20));
    }, 900);
    return () => clearInterval(id);
  }, []);

  /*const currentPhrase: Phrase | null = lesson?.phrases?.[currentIndex] ?? null;

  const handlePlay = () => {
    if (!currentPhrase) return;
    if (currentPhrase.audioUrl && audioRef.current) {
      audioRef.current.playbackRate = speed;
      audioRef.current.src = currentPhrase.audioUrl;
      audioRef.current.play();
    }
  };*/

  const handleNext = () => setCurrentIndex(i => Math.min((subtitle?.length ?? 1) - 1, i + 1));
  //const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1));

  const startRecording = async () => {
    if (!navigator.mediaDevices) return alert('Recording not supported');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    recordedChunksRef.current = [];
    mr.ondataavailable = (e) => { if (e.data.size) recordedChunksRef.current.push(e.data); };
    mr.onstop = async () => {
      //const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
      try {
        console.log("try recording");
        /*if (currentPhrase) {
          const res = await submitRecording(currentPhrase.id, blob);
          setScore(res.score ?? null);
        }*/
      } catch (e) {
        console.error(e);
        alert('Upload failed');
      }
    };
    mediaRecorderRef.current = mr;
    mr.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    const tracks = mediaRecorderRef.current?.stream ? mediaRecorderRef.current.stream.getTracks() : [];
    tracks.forEach(t => t.stop());
    setIsRecording(false);
  };

  const handleSearchChange = (v: string) => {
    if (v.length > 255) return;
    setSearch(v);
    // in a full implementation we'd call search API to filter lessons
  };

  return (
    <div className="min-h-screen bg-[#FBF1F1] p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-black">VietTalk</Link>
          <div>
            <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter">シャドーイング / Luyện nói</h2>
            <p className="text-sm text-gray-500">{lesson?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input value={search} onChange={e => handleSearchChange(e.target.value)} placeholder="レッスンを検索" maxLength={255} className="px-4 py-2 rounded-2xl border" />
          <button className="p-2 rounded-full bg-gray-100">🔔</button>
          <button className="p-2 rounded-full bg-gray-100">JP</button>
          <Link to="/login" className="p-2 rounded-full bg-gray-100">👤</Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[calc(100%-100px)]">
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-[#FFE4E4] overflow-hidden shadow-lg aspect-video relative group cursor-pointer">
            <img src={lesson?.image || "https://placehold.co/400x400/f5f0ed/333?text=No+Image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Lesson Visual" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button onClick={handlePlayPause} className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/30 text-white">
                {isPlaying ? <Pause fill="currentColor" size={40} className="translate-x-1" /> : <Play fill="currentColor" size={40} className="translate-x-1" />}
              </button>
            </div>
            <div className="absolute bottom-8 left-8 text-white shadow-lg">
              <h4 className="text-2xl font-black italic leading-none">{lesson?.lessonName}</h4>
              <p className="text-xs font-bold opacity-80 mt-2">{lesson?.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-[#FFE4E4] p-10 space-y-8 shadow-lg">
            <div className="flex items-center justify-between text-xs font-black text-gray-400 italic tracking-widest">
              <div className="flex gap-2 bg-[#FFF1F1] p-1.5 rounded-2xl">
                {[0.25, 0.5, 1, 1.25, 1.5].map(s => (
                  <button key={s} onClick={() => setSpeed(s)} className={`px-4 py-2 ${s === speed ? 'bg-[#B91C1C] text-white rounded-xl' : 'text-[#B91C1C]'}`}>{s}x</button>
                ))}
              </div>
              <span className="text-[#B91C1C] uppercase tracking-tighter">ピッチ</span>
            </div>

            <div className="h-24 flex items-center gap-1.5 justify-center px-4">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%`, transition: 'height 800ms ease-in-out' }}
                  className="w-2 bg-[#B91C1C] rounded-full opacity-30 shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-[3rem] border border-[#FFE4E4] p-10 flex flex-col items-center justify-center text-center space-y-6">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">フレーズ {currentIndex + 1} / {subtitle?.length ?? 0}</span>
              <button onClick={handleNext} className="bg-[#FFF1F1] text-[#B91C1C] px-10 py-4 rounded-[2rem] font-black text-sm italic hover:bg-[#FFE4E4] transition-all">
                次のフレーズ
              </button>
            </div>

            <div className="bg-white rounded-[3rem] border border-[#FFE4E4] p-10 flex flex-col justify-center gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic mb-2">ステータス</p>
                  <p className="font-black text-gray-900 flex items-center gap-3 italic">
                    <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span> {isRecording ? '録音中' : '録音可能'}
                  </p>
                </div>
                <div className="flex gap-4">
                  {!isRecording ? (
                    <button onClick={startRecording} className="w-20 h-20 bg-gradient-to-br from-[#B91C1C] to-[#E11D48] text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-300 hover:scale-110 active:scale-95 transition-all">
                      <Mic size={32} />
                    </button>
                  ) : (
                    <button onClick={stopRecording} className="w-20 h-20 bg-gray-200 text-[#B91C1C] rounded-full flex items-center justify-center shadow transition-all">Stop</button>
                  )}
                </div>
              </div>
            </div>

            <div className="min-h-100 col-span-2 bg-white rounded-[4rem] border border-[#FFE4E4] p-16 flex flex-col items-center justify-center text-center space-y-10 shadow-lg relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter leading-tight">{currentSubtitleJP}</h2>
                <h3 className="text-2xl font-black text-gray-400 font-mono tracking-tighter select-all">{currentSubtitle}</h3>
              </div>
              <div className="text-[180px] font-black text-gray-50/50 absolute bottom-[-40px] pointer-events-none italic select-none">PHRASE</div>
            </div>
          </div>

          <div className="bg-[#B91C1C] rounded-[3rem] p-10 flex items-center justify-between text-white shadow-2xl shadow-red-900/20">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-14 h-14 rounded-2xl border-4 border-[#B91C1C] bg-[#B91C00] flex items-center justify-center font-black text-xs italic shadow-lg">VN</div>
                <div className="w-14 h-14 rounded-2xl border-4 border-[#B91C1C] bg-orange-500 flex items-center justify-center font-black text-xs italic shadow-lg">JP</div>
              </div>
              <div>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest italic">解析モード</p>
                <p className="font-black text-xl italic underline decoration-white/20 underline-offset-4">リアルタイム比較</p>
              </div>
            </div>

            <div className="flex gap-12 text-center">
              <div className="space-y-1">
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest italic">一致度</p>
                <p className="text-4xl font-black text-green-400 italic">{score ? `${score}%` : '—'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest italic">タイミング</p>
                <p className="text-4xl font-black text-white italic">PRO</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setCurrentIndex(0); setScore(null); }} className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md">
                <RotateCcw size={24} className="rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {lesson?.video &&
        (<audio
          ref={audioRef}
          src={lesson.video}
          onPlay={() => setIsPlaying(true)}
          onPause={() => { setIsPlaying(false) }}
          onEnded={() => { setIsPlaying(false) }}
          onTimeUpdate={ handleTimeUpdate }
        />)}
    </div>
  );
}

export default ShadowingScreen;