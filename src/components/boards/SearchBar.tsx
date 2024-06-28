import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@mantine/core";
import Image from "next/image";
import searchIcon from "@/public/assets/ic_search.svg";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="w-full rounded-md">
      <form className="flex flex-row gap-2.5">
        <div className="flex w-full flex-row gap-2.5 rounded-md bg-gray-100 px-3">
          <Image src={searchIcon} alt="검색" width={22} height={22} />
          <input placeholder="제목을 검색해주세요" value={searchValue} onChange={handleSearchChange} onKeyPress={handleSearchEnter} className="w-full bg-gray-100" />
        </div>
        <div className="w-[80px]">
          <Button className="mr-5 h-[45px] w-[80px] rounded-md bg-green-200 text-14 text-white" onClick={handleSearchClick}>
            검색
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
