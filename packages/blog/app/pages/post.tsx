import { redirect, useLoaderData } from "react-router";
import { getPostBySlug } from "../posts/post.server";
import type { Route } from "./+types/post";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const slug = params.slug;
  try {
    const post = await getPostBySlug(slug);
    return post;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Cannot found")) {
      throw redirect("/404");
    }
    throw error;
  }
};

const PostDetail = () => {
  const post = useLoaderData<typeof loader>();

  return (
    <article>
      <h1>{post.metadata.title}</h1>
      {post.metadata.tags.length > 0 && <div>Tags: {post.metadata.tags.join(", ")}</div>}
      <div dangerouslySetInnerHTML={{ __html: post.contents }} />
    </article>
  );
};

export default PostDetail;
