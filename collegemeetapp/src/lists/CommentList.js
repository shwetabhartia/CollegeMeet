import React from 'react';
import Comment from './Comment';
import { ListGroup } from 'react-bootstrap';

const CommentList = ({ comments }) => (
    <ListGroup>
      {comments.map(comment => 
        <Comment key={comment.cid} pid={comment.pid} name={comment.name} content={comment.content} uid={comment.uid}></Comment>
       )}
    </ListGroup>
);

export default CommentList;
