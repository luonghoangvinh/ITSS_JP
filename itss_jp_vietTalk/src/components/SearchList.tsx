import { use, useEffect, useState } from "react";
import type TranslateType from "../types/translateType";
import SearchResultShow from "./SearchResultShow";
import "./SearchList.css";



type SearchListProps = {
    setSearchState: (keyword: TranslateType) => void;
}

function SearchList({ setSearchState }: SearchListProps) {
    const [search, setSearch] = useState<string>("");

    const [result, setResult] = useState("");

    const translateText = async ({ text }: { text: string }) => {
        if (!text.trim()) return;

        try {
            const res = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    text
                )}&langpair=vi|ja`
            );

            const data = await res.json();

            setResult(data.responseData.translatedText);
            setSearchState({ vn: search, jp: result });
        } catch (err) {
            console.error(err);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            translateText({ text: search });
            
        }
    };

    const [entries, setEntries] = useState<TranslateType[]>([
        { vn: "Xin chào", jp: "こんにちは" },
        { vn: "Cảm ơn", jp: "ありがとう" },
        { vn: "Phở", jp: "フォー" },
        { vn: "Thành phố", jp: "都市" },
        { vn: "Phát triển", jp: "発展する" },
    ]);



    return (

        <div className="w-50 gap-4 bg-[#FFEDEC] flex flex-col h-dvh p-4 ml-4" >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900 italic tracking-tighter underline decoration-[#B91C1C]/10 underline-offset-8">辞書</h2>
                <div>Header</div>
            </div>

            <div className="space-y-2 w-45 h-10 mb-6">
                <input
                    type="text"
                    placeholder="辞書を検索                            🔍"
                    className="w-full h-full bg-[#F2DEDE] rounded-[2.5rem] text-xs font-bold text-gray-700 outline-none border-2 border-transparent focus:border-[#B91C1C]/20 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="flex flex-col gap-4">
                {entries.map((entry, idx) => (
                    <div
                        key={idx}
                        id="search-history-card"
                        className="relative border-solid bg-white rounded-[2.5rem] w-3/4 h-15 border border-[#FFE4E4] p-6 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform duration-200 "
                    >
                        <div  className="absolute top-2 left-2">
                            <h3 className="text-xs font-black text-gray-900 italic">{entry.vn}</h3>
                            <p className="text-xs text-gray-500 font-bold opacity-60">{entry.jp}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>


    );
};
export default SearchList;