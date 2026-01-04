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

const getPostFiles = async (): Promise<string[]> => {
  const files = await fs.readdir(POST_BASE_PATH);
  return files
    .filter((file) => file.endsWith(POST_EXT))
    .map((file) => path.join(POST_BASE_PATH, file));
};

const readPostFile = async (filePath: string) => {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return matter(fileContents);
};

const findPostFileBySlug = async (
  slug: string
): Promise<{ data: Record<string, unknown>; content: string }> => {
  const files = await getPostFiles();

  for (const filePath of files) {
    const { data, content } = await readPostFile(filePath);
    const metadata = parseMetadata(data);

    if (metadata.slug === slug) {
      return { data, content };
    }
  }

  throw new Error(`Cannot found post with slug: ${slug}`);
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const { data, content } = await findPostFileBySlug(slug);
  const metadata = parseMetadata(data);
  const contents = await parseMarkdown(content);

  return { slug, metadata, contents };
};

const parseMetadata = (data: Record<string, unknown>): PostMetadata => {
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

const parseMarkdown = async (content: string): Promise<string> => {
  const parsed = await unified()
    .use(parse)
    .use(rehype)
    .use(sanitize)
    .use(stringify)
    .process(content);

  return parsed.toString();
};
