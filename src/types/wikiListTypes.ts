export interface Article {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: string;
  totalCount: number;
}

export interface UserCardProps {
  articles: Article[];
}

export interface SearchPros {
  value: string;
  setValue: (value: string) => void;
  page: number;
  setPage: (page: number) => void;
}
