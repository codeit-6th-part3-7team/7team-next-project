interface NextImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  image?: NextImage;
}

export interface PostList {
  posts: Post[];
}
