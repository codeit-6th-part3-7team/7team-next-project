import { DeleteCommentRequestSchemaType, DeleteCommentResponseSchemaType, GetArticleCommentListRequestSchemaType, GetArticleCommentListResponseSchemaType } from "../schema/comment";
import instance from "./axios";

export const getArticleCommentList = async (params: GetArticleCommentListRequestSchemaType): Promise<GetArticleCommentListResponseSchemaType> => {
  const { articleId, ...rest } = params;
  const response = await instance.get(`/articles/${articleId}/comments`, { params: rest });
  return response.data;
};

export const deleteComment = async (request: DeleteCommentRequestSchemaType): Promise<DeleteCommentResponseSchemaType> => {
  const response = await instance.delete(`/comments/${request.commentId}`);
  return response.data;
};
