import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Post from "../../components/Post/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

const PostPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postid,
    },
  });
  const post: Post = data?.getPostByPostId;
  return (
    <div className="mx-auto max-w-5xl my-7">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
