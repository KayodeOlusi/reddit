import React, { FC } from "react";

type Props = {
  post: Post;
};

const Post: FC<Props> = ({ post }) => {
  return (
    <div>
      {/**Votes */}
      <div></div>

      <div>
        {/**Header */}
        {/**Body */}
        {/**Image */}
        {/**Footer */}
      </div>
    </div>
  );
};

export default Post;
