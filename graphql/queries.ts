import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditListByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        post_id
        id
        username
        text
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        username
        upvote
      }
    }
  }
`;
