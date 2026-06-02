import { useState } from "react";
import type TranslateType from "../../types/TranslateType";
import SearchList from "../../components/SearchList";
import SearchResultShow from "../../components/SearchResultShow";





function DictionaryScreen() {
    const [keyword, setKeyword] = useState<TranslateType>({ vn: "Xin chào", jp: "こんにちは" });
    return (
        <div className="flex">
            <SearchList setSearchState={setKeyword} />
            <SearchResultShow result={keyword} />
        </div>
    );
}
export default DictionaryScreen;