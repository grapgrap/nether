import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import sanitize from "rehype-sanitize";
import stringify from "rehype-stringify";
import parse from "remark-parse";
import rehype from "remark-rehype";
import { unified } from "unified";
import { z } from "zod";
import type { Post } from "./types/post";
import type { PostMetadata } from "./types/post-metadata";

const POST_BASE_PATH = path.join(process.cwd(), "contents", "posts");
const POST_EXT = ".md";

export const getPostBySlug = async (slug: string): Promise<Post> => {
  if (!/^[a-zA-Z0-9\-/]+$/.test(slug)) {
    throw new Error("Invalid slug format");
  }

  const filePath = path.join(POST_BASE_PATH, `${slug}${POST_EXT}`);

  let fileContents: string;
  try {
    fileContents = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    throw new Error("Cannot found post file.", { cause: error });
  }

  const { data, content } = matter(fileContents);

  const metadata = parseMetadata(data);
  const contents = await parseMd(content);

  return {
    slug,
    metadata,
    contents,
  };
};

const parseMetadata = (data: Record<string, unknown>): PostMetadata => {
  return z
    .object({
      title: z.string(),
      tags: z.string().array().default([]),
      isDraft: z.boolean().default(true),
      publishedDate: z.iso.datetime().optional(),
    })
    .parse(data);
};

const parseMd = async (content: string): Promise<string> => {
  const parsed = await unified()
    .use(parse)
    .use(rehype)
    .use(sanitize)
    .use(stringify)
    .process(content);
  return String(parsed);
};
