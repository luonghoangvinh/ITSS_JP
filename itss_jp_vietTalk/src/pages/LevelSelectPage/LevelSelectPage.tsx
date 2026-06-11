import type LevelSelectType from "../../types/LevelSelectType";
import "./LevelSelectPage.css";
import { Bell, CircleUserRound, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
const PRIMARY = "#e8505b";
const LEVELS: LevelSelectType[] = [
    {
        id: "A",
        tag: "Beginner",
        tagColor: { bg: "#e1f5ee", text: "#0f6e56" },
        headerBg: "#e8f5ef",
        emoji: "🥗",
        progress: 90,
        progressColor: "#0f6e56",
        name: "レベルA",
        desc: "基本的なあいさつ、文法の基礎、文化的マナーから学習を始めましょう。",
        unlocked: true,
    },
    {
        id: "B",
        tag: "Intermediate",
        tagColor: { bg: "#faeeda", text: "#854f0b" },
        headerBg: "#fef3ea",
        emoji: "🍔",
        progress: 0,
        progressColor: "#ba7517",
        name: "レベルB",
        desc: "日常会話をマスターし、語彙を増やし、一般的な社会的場面に対応できるようになりましょう。",
        unlocked: false,
    },
    {
        id: "C",
        tag: "Advanced",
        tagColor: { bg: "#e6f1fb", text: "#185fa5" },
        headerBg: "#eaf2fb",
        emoji: "🧑‍💼",
        progress: 0,
        progressColor: "#5f5e5a",
        name: "レベルC",
        desc: "抽象的な話題や専門的なテーマについて議論し、豊かな文化的交流を理解できるようになります。",
        unlocked: false,
    },
];

type LevelCardProps = {
    readonly level: LevelSelectType;
};
function LevelCard( { level }: LevelCardProps) {
    const navigate = useNavigate();

    return (
        <div className="LevelCard"
        >
            {/* Card Header nơi lưu, hiển thị ảnh*/}
            <div
                style={{
                    height: 110,
                    background: level.headerBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <span style={{ fontSize: 52 }}>{level.emoji}</span>
                {/* Progress Badge */}
                <div
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#fff",
                        border: `2px solid ${level.progressColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 600,
                        color: level.progressColor,
                    }}
                >
                    {level.progress}%
                </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "12px 14px 16px" }}>
                <span
                    style={{
                        display: "inline-block",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: level.tagColor.bg,
                        color: level.tagColor.text,
                        marginBottom: 6,
                    }}
                >
                    {level.tag}
                </span>
                <div
                    style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#000000",
                        marginBottom: 6,
                    }}
                >
                    {level.name}
                </div>
                <div
                    style={{
                        fontSize: 11,
                        color: "#000000",
                        lineHeight: 1.6,
                        marginBottom: 14,
                    }}
                >
                    {level.desc}
                </div>

                {true ? (
                    <button
                    onClick={()=>navigate(`/home/lessons/${level.tag}`)}
                        style={{
                            width: "100%",
                            background: PRIMARY,
                            color: "#fff",
                            border: "none",
                            borderRadius: 20,
                            padding: "8px 0",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#d44050")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
                    >
                        ▶ 学習を続ける
                    </button>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            background: "#f5f4f2",
                            color: "#000000",
                            border: "0.5px solid #e0ddd8",
                            borderRadius: 20,
                            padding: "8px 0",
                            fontSize: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                        }}
                    >
                        🔒 レベルをアンロック
                    </div>
                )}
            </div>
        </div>
    );
}

export default function LevelSelectPage() {
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic Pro', sans-serif",
                background: "#FFF4F3",
            }}
        >

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "24px 28px",
                    position: "relative",
                }}
            >
                {/* Top Bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 22,
                        background: "#fff",
                        borderRadius: 16,
                        padding: "14px 20px",
                    }}
                >
                    <div>
                        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#000000", margin: 0 }}>
                            レベル選択
                        </h1>
                        <p style={{ fontSize: 12, color: "#000000", margin: "3px 0 0" }}>
                            天国が最佳語言を選択してください
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 14, color: "#999", fontSize: 18 }}>
                        <span style={{ cursor: "pointer" }}><Bell /></span>
                        <span style={{ cursor: "pointer" }}><Languages /></span>
                        <span style={{ cursor: "pointer" }}><CircleUserRound /></span>
                    </div>
                </div>

                {/* Level Cards Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 16,
                        marginBottom: 18,
                    }}
                >
                    {LEVELS.map((level) => (
                        <LevelCard key={level.id} level={level} />
                    ))}
                </div>

                {/* Bottom Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {/* Milestone Card */}
                    <div
                        style={{
                            background: "#fff9e6",
                            borderRadius: 16,
                            padding: 18,
                            border: "0.5px solid #fac775",
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                background: "#ef9f27",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                                marginBottom: 10,
                            }}
                        >
                            🏆
                        </div>
                        <div style={{ fontSize: 12, color: "#854f0b", fontWeight: 600, marginBottom: 2 }}>
                            実績
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#412402", marginBottom: 8 }}>
                            主なマイルストーン
                        </div>
                        <div style={{ fontSize: 11, color: "#854f0b", lineHeight: 1.6, marginBottom: 14 }}>
                            各レベルをクリアするごとに、限定のカルチャートークンがアンロックされ、コミュニティのディスカッションに参加できるようになります。
                        </div>
                        {/* Avatars */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {[
                                { label: "VN", bg: PRIMARY },
                                { label: "UZ", bg: "#185fa5" },
                                { label: "+12", bg: "#444" },
                            ].map((av, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: "50%",
                                        background: av.bg,
                                        color: "#fff",
                                        fontSize: 9,
                                        fontWeight: 700,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid #fff9e6",
                                        marginLeft: i === 0 ? 0 : -6,
                                    }}
                                >
                                    {av.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Culture Card */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 16,
                            padding: 18,
                            border: "0.5px solid #ece9e3",
                            position: "relative",

                        }}
                    >
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#000000", marginBottom: 12 }}>
                            今日の文化豆知識
                        </div>
                        <div style={{ fontSize: 10, color: PRIMARY, fontWeight: 600, marginBottom: 6 }}>
                            エチケット · レベルA
                        </div>
                        <div
                            style={{
                                background: "#fde8ea",
                                borderRadius: 10,
                                padding: "10px 14px",
                            }}
                        >
                            <p style={{ fontSize: 12, color: "#712b13", lineHeight: 1.65, margin: 0 }}>
                                ベトナムで贈り物を受け取るときは、敬意と感謝の気持ちを表すために、両手を使うのが礼儀です。
                            </p>
                        </div>
                        <button
                        style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: PRIMARY,
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                            color: "#fff",
                        }}
                    >
                        ▶
                    </button>
                    </div>
            
                </div>


            </main>
        </div>
    );
}
