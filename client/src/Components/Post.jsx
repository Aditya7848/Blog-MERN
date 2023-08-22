import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            className="post_img"
            src={"http://localhost:4000/" + cover}
            alt="Post-image"
          />
        </Link>
      </div>
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <Link to="/" className="author">
            {author.userName}
          </Link>
          <time>{format(new Date(createdAt), "dd MMM yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
