import { getPostFiles, readPostFile } from "./fs";
import { parseMetadata, parsePost } from "./parsers";
import type { Matter, Post } from "./types/post";

const findPostFileBySlug = async (slug: string): Promise<Matter> => {
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
  const matter = await findPostFileBySlug(slug);
  return parsePost(matter);
};
