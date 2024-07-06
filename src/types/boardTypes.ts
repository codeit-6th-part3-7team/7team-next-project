import { ImageProps } from "next/image";

export interface Post {
  id: number;
  title: string;
  writer: {
    id: number;
    name: string;
  };
  image: ImageProps | null;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
}
