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

export const GET_POST_BY_POST_ID = gql`
  query GetPostByPostId($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
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

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query GetAllPostsByTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
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

export const GET_VOTES_BY_POST_ID = gql`
  query GetVotesByPostId($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      username
      upvote
    }
  }
`;

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query GetSubredditWithLimit($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;
