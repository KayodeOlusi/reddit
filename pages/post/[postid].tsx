import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post from "../../components/Post/Post";
import { useForm, SubmitHandler } from "react-hook-form";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { ADD_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";

type FormData = {
  comment: string;
};

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postid,
    },
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const post: Post = data?.getPostByPostId;
  console.log(data);

  // Post the comment
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading("Posting comment...");

    try {
      await addComment({
        variables: {
          post_id: router.query.postid,
          username: session?.user?.name,
          text: data.comment,
        },
      });
    } catch (error) {
      toast.error("Error posting comment");
    }

    setValue("comment", "");
    toast.success("Comment posted!", {
      id: notification,
    });
  };

  return (
    <div className="mx-auto max-w-5xl my-7">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-top-0 border-gray-300 bg-white p-5 pl-6">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            disabled={!session}
            {...register("comment")}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={session ? "Your thoughts" : "Sign in to comment"}
          />

          <button
            type="submit"
            disabled={!session}
            className="rounded-full bg-red-500 p-3 text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
