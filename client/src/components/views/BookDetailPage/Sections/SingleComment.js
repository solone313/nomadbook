import React from "react";
import { Comment, Avatar } from "antd";
import StarRatings from "react-star-ratings";

function SingleComment(props) {
  return (
    <div>
      <Comment
        author={<div style={{fontSize:"large"}}>{props.comment.writer.name}</div>}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={
          <div>
            <h3>
              <StarRatings
                rating={props.comment.rating}
                starRatedColor="red"
                starDimension="15px"
                starSpacing="2.5px"
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
