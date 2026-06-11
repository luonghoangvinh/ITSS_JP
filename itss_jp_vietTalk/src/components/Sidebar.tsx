import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import { BookOpen, GraduationCap, House, LogOut, Rows3, Settings } from "lucide-react";
export function Sidebar() {
    return (
        <div className="Sidebar">
            <nav>
                <Link id="Logo" to="/">VietTalk</Link>
                <p id="LogoText">ベトナム語を学ぶ</p>
                <ul>
                    <li>
                        <NavLink to="/home" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><House size={20} /></span>
                            <span className="pt-1.5">ホーム</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/dictionary" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><BookOpen size={20} /></span>
                            <span className="ml-1.5">辞書</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/levelselect" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><GraduationCap size={20} /></span>
                            <span className="ml-1.5">レッスン</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/settings" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><Settings size={20} /></span>
                            <span className="ml-1.5">設定</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/levelselect" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><Rows3 size={20} /></span>
                            <span className="ml-1.5">レベル選択</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/levelassessment" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><Rows3 size={20} /></span>
                            <span className="ml-1.5">レベル判定</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/leveltest" className={({ isActive }) => `gap-1.5 ${isActive ? "active" : ""}`}>
                            <span className="mt-1"><BookOpen size={20} /></span>
                            <span className="ml-1.5">レベルテスト</span>
                        </NavLink>
                    </li>

                    <Link 
                        to="/login" 
                        className="cursor-pointer flex absolute bottom-4"
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('userId');
                        }}
                    >
                        <span className="mr-2 text-[#645959]"><LogOut scale={24} /></span>
                        <span className="text-2xs text-[#645959]">ログアウト</span>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}