import { useRouter } from "next/router";
import { Fragment } from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostBox from "../../components/PostBox";

const Subreddit = () => {
  const {
    query: { topic },
  } = useRouter();

  return (
    <Fragment>
      <div className={`h-24 bg-red-400 p-8`}>
        <div className="-mx-8 mt-10 bg-white">
          <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
            <div className="-mt-10 md:-mt-5">
              <Avatar seed={topic as string} large />
            </div>
            <div className="py-2">
              <h1 className="text-lg md:text-3xl font-semibold">
                Welcome to the r/{topic} subreddit
              </h1>
              <p className="text-sm">r/{topic}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-5xl pb-10">
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </Fragment>
  );
};

export default Subreddit;
