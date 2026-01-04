import sanitize from "rehype-sanitize";
import stringify from "rehype-stringify";
import parse from "remark-parse";
import rehype from "remark-rehype";
import { unified } from "unified";
import { z } from "zod";
import type { PostMetadata } from "./types/post-metadata";

export const parseMetadata = (data: Record<string, unknown>): PostMetadata => {
  return z
    .object({
      slug: z.string(),
      title: z.string(),
      tags: z.string().array().default([]),
      isDraft: z.boolean().default(true),
      publishedDate: z.iso.datetime().optional(),
    })
    .parse(data);
};

export const parseMarkdown = async (content: string): Promise<string> => {
  const parsed = await unified()
    .use(parse)
    .use(rehype)
    .use(sanitize)
    .use(stringify)
    .process(content);

  return parsed.toString();
};
