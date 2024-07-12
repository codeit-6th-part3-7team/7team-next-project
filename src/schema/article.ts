import * as z from "zod";
import createDefaultListSchema from "./list";

export const WriterSchema = z.object({
  name: z.string(),
  id: z.number(),
});
export type Writer = z.infer<typeof WriterSchema>;

export const ArticleDetailReponseSchema = z.object({
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  likeCount: z.number(),
  writer: WriterSchema,
  image: z.string(),
  title: z.string(),
  id: z.number(),
  isLiked: z.boolean(),
  content: z.string(),
});

export const ArticleListItemSchema = ArticleDetailReponseSchema.omit({
  isLiked: true,
  content: true,
});

export const ArticleListReponseSchema = createDefaultListSchema(ArticleListItemSchema);
export const ArticleListRequestSchema = z.object({
  page: z.optional(z.number()),
  pageSize: z.optional(z.number()),
  orderBy: z.optional(z.enum(["recent", "like"])),
  keyword: z.optional(z.string()),
});

export type ArticleDetailReponseType = z.infer<typeof ArticleDetailReponseSchema>;

export type ArticleListReponseType = z.infer<typeof ArticleListReponseSchema>;
export type ArticleListRequestType = z.infer<typeof ArticleListRequestSchema>;
