type Comments = {
  created_at: string;
  post_id: number;
  id: number;
  username: string;
  text: string;
};

type Vote = {
  created_at: string;
  id: number;
  post_id: number;
  username: string;
  upvote: boolean;
};

type Subreddit = {
  created_at: string;
  id: number;
  topic: string;
};

type Post = {
  body: string;
  created_at: string;
  id: number;
  image: string;
  title: string;
  subreddit_id: number;
  username: string;
  comments: Comments[];
  subreddit: Subreddit[];
  votes: Vote[];
};
