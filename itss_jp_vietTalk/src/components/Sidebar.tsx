import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BookOpen, GraduationCap, House, LogOut, Rows3, Settings } from "lucide-react";
import { div } from "framer-motion/client";
export function Sidebar() {
    return (
        <div className="Sidebar">
            <nav>
                <Link id="Logo" to="/">VietTalk</Link>
                <p id="LogoText">ベトナム語を学ぶ</p>
                <ul>
                    <li>
                        <Link to="/home" className="gap-1.5">
                            <span className="mt-1">{<House size={20} />}</span>
                            <span className="pt-1.5">ホーム</span>
                        </Link>
                    </li>
                    <li >

                        <Link to="/home/dictionary" className="gap-1.5">
                            <span className="mt-1">{<BookOpen size={20} />}</span>

                            <span className="ml-1.5">辞書</span>
                        </Link>
                    </li>

                    <li>

                        <Link to="/home/lessons" className="gap-1.5">
                            <span className="mt-1">{<GraduationCap size={20} />}</span>

                            <span className="ml-1.5">レッスン</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/home/settings" className="gap-1.5">
                            <span className="mt-1">{<Settings size={20} />}</span>
                            <span className="ml-1.5">設定</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/home/levelselect" className="gap-1.5">
                            <span className="mt-1">{<Rows3 size={20} />}</span>
                            <span className="ml-1.5">レベル判定</span>
                        </Link>
                    </li>

                    <Link to="/login" className="cursor-pointer flex absolute bottom-4">
                        <span className="mr-2 text-[#645959]"><LogOut scale={24} /></span>
                        <span className="text-2xs text-[#645959]">ログアウト</span>
                    </Link>
                </ul>
            </nav>

        </div>
    )
}