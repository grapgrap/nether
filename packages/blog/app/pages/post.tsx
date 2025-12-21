import { redirect, useLoaderData } from "react-router";
import { getPostBySlug } from "../posts/post.server";

export const loader = async ({ params }: { params: Record<string, string> }) => {
  const slug = params["*"] || "";
  try {
    const post = await getPostBySlug(slug);
    return post;
  } catch {
    throw redirect("/");
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
