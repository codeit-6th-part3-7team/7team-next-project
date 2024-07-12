import { useMutation, useQuery } from "@tanstack/react-query";
import quries from "../apis/queries";
import { DeleteCommentRequestSchemaType, GetArticleCommentListRequestSchemaType } from "../schema/comment";
import { deleteComment } from "../apis/comment";
import { MutationOptions } from "../types/query";

export const useArticleCommentList = (params: GetArticleCommentListRequestSchemaType) =>
  useQuery({
    ...quries.comment.getArticleCommentList({ ...params }),
    enabled: !!params.articleId,
  });

export const useDeleteComment = (options?: MutationOptions) =>
  useMutation({
    mutationFn: (request: DeleteCommentRequestSchemaType) => deleteComment(request),
    ...options,
    onSuccess: (...arg) => {
      if (options?.onSuccess) {
        options?.onSuccess(...arg);
      }
    },
  });
