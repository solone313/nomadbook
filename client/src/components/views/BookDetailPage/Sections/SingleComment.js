import React from 'react';
import {Comment, Avatar} from 'antd';



function SingleComment(props) {
    
    return (
        <div>
        <Comment
            author={props.comment.writer.name}
            avatar={
                <Avatar
                    src={props.comment.writer.image}
                    alt="image"
                />
            }
            content={<p><h3>{props.comment.rating}개의 별점 부여</h3>{props.comment.content}</p>}
        ></Comment>

    </div>
    )
}

export default SingleComment
