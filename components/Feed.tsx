import { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";
import Post from "./Post/Post";

const Feed: FC = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);
  const posts: Post[] = data?.getPostList;

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
