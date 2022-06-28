import { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Post from "./Post/Post";

type Props = {
  topic?: string;
};

const Feed: FC<Props> = ({ topic }) => {
  const { data, error, loading } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: { topic },
      });
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  return (
    <div className="mt-5 space-y-4 w-full">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
