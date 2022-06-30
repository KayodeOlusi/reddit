import { FC, useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatIcon,
  GiftIcon,
  ShareIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Avatar from "../Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VOTES_BY_POST_ID } from "../../graphql/queries";
import { ADD_VOTE } from "../../graphql/mutations";

type Props = {
  post: Post;
};

const Post: FC<Props> = ({ post }) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();
  const { data } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data]);

  const upVote = async (isUpVote: boolean) => {
    if (!session) {
      toast.error("You must be logged in to vote");
      return;
    }

    if (vote && isUpVote) return;
    if (vote === false && !isUpVote) return;

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpVote,
      },
    });
  };

  const displayVote = (data: any): number => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (acc, vote) => (vote.upvote ? (acc += 1) : (acc -= 1)),
      0
    );

    if (votes?.length === 0) return 0;
    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#ff4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div
        className="flex cursor-pointer rounded-md
     border border-gray-300 bg-white shadow-sm hover:border-gray-600"
      >
        {/**Votes */}
        <div
          className="flex flex-col items-center justify-start
       space-y-1 rounded-l-md bg-gray-50 text-gray-500"
        >
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && "text-red-400"
            }`}
          />
          <p className="text-black font-bold text-sm">{displayVote(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && "text-blue-400"
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          {/**Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0].topic} />
            <p className="text-sm text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0].topic}
                </span>
              </Link>{" "}
              . Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          {/**Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/**Image */}
          {post.image && (
            <img className="w-full" src={post.image} alt={post.title} />
          )}

          {/**Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatIcon className="h-6 w-6" />
              <p className="">{post.comments.length}</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length}</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length}</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length}</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
