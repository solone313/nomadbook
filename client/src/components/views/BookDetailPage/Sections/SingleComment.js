import React from "react";
import { Comment, Avatar } from "antd";
import StarRatings from "react-star-ratings";

function SingleComment(props) {
  return (
    <div>
      <Comment
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={
          <div>
            <h3>
              <StarRatings
                rating={props.comment.rating}
                starRatedColor="red"
                starDimension="10px"
                starSpacing="1px"
              />
            </h3>
            <p>{props.comment.content}</p>
          </div>
        }
      ></Comment>
    </div>
  );
}

export default SingleComment;
