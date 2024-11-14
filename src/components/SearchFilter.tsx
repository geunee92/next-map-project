import { AiOutlineSearch } from "react-icons/ai";
import { DISTRICT_LIST } from "@/data/store";
import { useAtom } from "jotai";
import { searchState } from "@/atom";

export default function SearchFilter() {
  const [search, setSearch] = useAtom(searchState);

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />

        <input
          type="search"
          onChange={(e) =>
            setSearch({ ...search, searchValue: e.target.value })
          }
          placeholder="음식점 검색"
          className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
        />
      </div>

      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 outline-none block w-full p-3"
      >
        <option value="">지역 선택</option>

        {DISTRICT_LIST.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
