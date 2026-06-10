import { Lightbulb, Volume2 } from "lucide-react";
import type TranslateType from "../types/TranslateType";
import "./SearchResultShow.css"
//import { useState } from "react";

type SearchResultShowProps = {
    result: TranslateType;
}
export default function SearchResultShow({ result }: SearchResultShowProps) {
    //const [searchResultShow, setSearchResultShow] = useState<TranslateType>(result);
    return (
        <div className="flex flex-col p-1 bg-white gap-4 w-full">
            <div className="flex items-center gap-8 bg-[#FFF1F1] w-full pl-8">
                <div className="flex flex-col gap-4">
                    <p className="text-[#B51621] text-4xl font-bold">{result.vn}</p>
                    <p className="text-2xl">{result.jp}</p>
                </div>

                <button className="p-4 bg-[#FFF1F1] text-[#B91C1C] rounded-2xl hover:bg-[#B91C1C] hover:text-white transition-all">
                    <Volume2 size={72} />
                </button>
            </div>

            {/* Example section */}
            <div className="flex  w-full gap-4  bg-white p-4 rounded-lg m-2 justify-center">
                {/* Example 1 */}
                <div className="bg-[#F7E4E3] rounded-[30px] p-4 border-l-8 border-l-red-800 min-w-[48%] min-h-24">
                    <div className="flex gap-0.5">
                        <span className="text-xl text-red-900 font-bold translate-y-0.5"><Lightbulb /></span>
                        <p className="text-xl text-red-900 font-bold">例 1</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl font-bold text-gray-900">Ví dụ của "{result.vn}"</p>
                        <p className="text-2xl font-bold text-gray-900">「 {result.jp}」の例</p>
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-[#F7E4E3] rounded-[30px] p-4 border-l-8 border-l-green-800 min-w-[48%] min-h-[12]">
                    <div className="flex gap-0.5">
                        <span className="text-xl text-green-900 font-bold translate-y-0.5"><Lightbulb /></span>
                        <p className="text-xl text-green-900 font-bold">例 2</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl font-bold text-gray-900">Ví dụ của "{result.vn}"</p>
                        <p className="text-2xl font-bold text-gray-900">「 {result.jp}」の例</p>
                    </div>
                </div>
            </div>

            

        </div>
    )
}