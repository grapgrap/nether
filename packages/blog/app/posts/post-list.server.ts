import { filter, map, pipe, toArray, toAsync } from "@fxts/core";

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
    toArray
  );
};
