import React from "react";
import { Button } from "@mantine/core";
import Image from "next/image";
import leftArrow from "@/public/assets/ic_left_arrow.svg";
import rightArrow from "@/public/assets/ic_right_arrow.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <div className="mb-10 flex justify-center space-x-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-12 w-12 items-center justify-center shadow-md hover:cursor-pointer"
        style={{ boxShadow: "0px 4px 20px 0px #00000014" }}
      >
        <Image src={leftArrow} alt="좌방향 화살" width={24} height={24} />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "filled" : "outline"}
          onClick={() => onPageChange(page)}
          className="flex h-12 w-12 items-center justify-center py-6 shadow-md"
          style={{ color: page === currentPage ? "#4CBFA4" : "#8F95B2", boxShadow: "0px 4px 20px 0px #00000014", height: "48px" }}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 items-center justify-center shadow-md hover:cursor-pointer"
        style={{ boxShadow: "0px 4px 20px 0px #00000014" }}
      >
        <Image src={rightArrow} alt="우방향 화살" width={24} height={24} />
      </Button>
    </div>
  );
}

export default Pagination;
