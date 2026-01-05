import { filter, map, pipe, sort, toArray, toAsync } from "@fxts/core";

import { getPostFiles, readPostFile } from "./fs";
import { parsePost } from "./parsers";
import type { Post } from "./types/post";

export const getPosts = async (): Promise<Post[]> => {
  const files = await getPostFiles();

  return pipe(
    files,
    map(readPostFile),
    toAsync,
    map(parsePost),
    filter((post) => post.metadata.isDraft === false),
    sort((x, y) => y.metadata.publishedDate!.localeCompare(x.metadata.publishedDate!)),
    toArray
  );
};
