import type { PostMetadata } from "./post-metadata";

export interface Post {
  slug: string;
  metadata: PostMetadata;
  contents: string;
}
