export interface Article {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
  totalCount: number;
}

export interface UserCardProps {
  articles: Article[];
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface SearchPros {
  value: string;
  setValue: (value: string) => void;
  page: number;
  setPage: (page: number) => void;
}
