import { getPostFiles, readPostFile } from "./fs";
import { parseMarkdown, parseMetadata } from "./parsers";
import type { Post } from "./types/post";

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
