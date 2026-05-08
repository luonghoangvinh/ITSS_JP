import { Link } from "react-router-dom";
import "./Sidebar.css";
export function Sidebar() {
    return (
            <div className="Sidebar">
                <nav>
                    <Link id="Logo" to="/">VietTalk</Link>
                    <p id="LogoText">ベトナム語を学ぶ</p>
                    <ul >
                    <li>
                        <Link to="/">ホーム</Link>
                    </li>
                    <li >
                        <Link to="/Dictionary">辞書</Link>
                    </li>

                    <li>
                        <Link to="/Lessons">レッスン</Link>
                    </li>
                    <li>
                        <Link to="/Settings">設定</Link>
                    </li>
                    <li>
                        <Link to="/LevelAssessment">レベル判定</Link>
                    </li>
                </ul>
                </nav>
                
            </div>
    )
}