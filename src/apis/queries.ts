import { createQueryKeyStore } from "@lukemorales/query-key-factory";

import { getMe } from "./user";
import { GetArticleCommentListRequestSchemaType } from "../schema/comment";
import { getArticleCommentList } from "./comment";
import { getArticle } from "./article";

const quries = createQueryKeyStore({
  user: {
    getMe: () => ({
      queryKey: ["getMe"],
      queryFn: () => getMe(),
    }),
  },
  comment: {
    getArticleCommentList: (params: GetArticleCommentListRequestSchemaType) => ({
      queryKey: [params],
      queryFn: () => getArticleCommentList(params),
    }),
  },
  article: {
    getArticle: (articleId: number) => ({
      queryKey: [articleId],
      queryFn: () => getArticle(articleId),
    }),
  },
});

export default quries;
