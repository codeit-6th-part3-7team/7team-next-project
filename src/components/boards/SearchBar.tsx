import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Box, Button, TextInput } from "@mantine/core";
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
    <div className="mb-5 w-full rounded-md">
      <form className="flex flex-row gap-[15px]">
        <Box className="flex w-full flex-row items-center gap-2.5 rounded-md bg-gray-100 px-3">
          <Image src={searchIcon} alt="검색" width={22} height={22} />
          <TextInput
            placeholder="제목을 검색해주세요"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleSearchEnter}
            styles={{
              input: { backgroundColor: "transparent", border: "none", width: "100%", "::placeholder": { color: "gray" } },
            }}
          />
        </Box>
        <Button
          styles={{
            root: {
              height: "45px",
              width: "80px",
              backgroundColor: "#4CBFA4",
              fontSize: "14px",
              color: "white",
              borderRadius: "md",
            },
          }}
          onClick={handleSearchClick}
        >
          검색
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
