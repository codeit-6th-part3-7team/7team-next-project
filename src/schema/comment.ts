import * as z from "zod";

export const GetArticleCommentListRequestSchema = z.object({
  articleId: z.number(),
  limit: z.number(),
  cursor: z.optional(z.number()),
});

export const WriterSchema = z.object({
  image: z.string(),
  name: z.string(),
  id: z.number(),
});

export const ArticleCommentListItemSchema = z.object({
  writer: WriterSchema,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  content: z.string(),
  id: z.number(),
});

export const GetArticleCommentListResponseSchema = z.object({
  nextCursor: z.number(),
  list: z.array(ArticleCommentListItemSchema),
});

export const DeleteCommentRequestSchema = z.object({
  commentId: z.number(),
});
export const DeleteCommentResponseSchema = z.object({
  id: z.number(),
});

export type GetArticleCommentListResponseSchemaType = z.infer<typeof GetArticleCommentListResponseSchema>;
export type GetArticleCommentListRequestSchemaType = z.infer<typeof GetArticleCommentListRequestSchema>;
export type Writer = z.infer<typeof WriterSchema>;

export type List = z.infer<typeof ArticleCommentListItemSchema>;

export type DeleteCommentRequestSchemaType = z.infer<typeof DeleteCommentRequestSchema>;
export type DeleteCommentResponseSchemaType = z.infer<typeof DeleteCommentResponseSchema>;
