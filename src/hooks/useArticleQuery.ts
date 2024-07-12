import { useQuery } from "@tanstack/react-query";
import quries from "../apis/queries";

const useArticle = (articleId: number) => useQuery(quries.article.getArticle(articleId));

export default useArticle;
