import React from "react";
import Image from "next/image";
import leftArrow from "@/public/ic_left_arrow.svg";
import rightArrow from "@/public/ic_right_arrow.svg";
import { PaginationProps } from "@/src/types/wikiListTypes";

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageButtons = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`w-[45px] h-[45px] rounded-10 shadow-lg text-gray-400 focus:text-green-200 ${currentPage === i ? "text-green-200" : ""}`}
        type="button"
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="flex justify-center mt-4 gap-3">
      <div className="relative w-[45px] h-[45px]">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="w-[45px] h-[45px] rounded-10 shadow-lg text-gray-400 focus:text-green-200"
          type="button"
        >
          <div className="absolute top-3 left-2">
            <Image src={leftArrow} alt="이전 화살표" width={24} height={24} />
          </div>
        </button>
      </div>
      {pageButtons}
      <div className="relative w-[45px] h-[45px]">
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-[45px] h-[45px] rounded-10 shadow-lg text-gray-400 focus:text-green-200"
          type="button"
        >
          <div className="absolute top-3 left-2">
            <Image src={rightArrow} alt="다음 화살표" width={24} height={24} />
          </div>
        </button>
      </div>
    </div>
  );
}
