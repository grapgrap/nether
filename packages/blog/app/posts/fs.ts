import matter, { type GrayMatterFile } from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

const POST_BASE_PATH = path.join(process.cwd(), "contents", "posts");
const POST_EXT = ".md";

export const getPostFiles = async (): Promise<string[]> => {
  const files = await fs.readdir(POST_BASE_PATH);
  return files
    .filter((file) => file.endsWith(POST_EXT))
    .map((file) => path.join(POST_BASE_PATH, file));
};

export const readPostFile = async (filePath: string): Promise<GrayMatterFile<string>> => {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return matter(fileContents);
};
