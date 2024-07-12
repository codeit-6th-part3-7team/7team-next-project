import { ArticleDetailReponseType, ArticleListReponseType, ArticleListRequestType } from "../schema/article";
import instance from "./axios";

export const getArticles = async (params: ArticleListRequestType): Promise<ArticleListReponseType> => {
  const response = await instance.get("/articles", { params });
  return response.data;
};

export const getArticle = async (articleId: number): Promise<ArticleDetailReponseType> => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.data;
};
