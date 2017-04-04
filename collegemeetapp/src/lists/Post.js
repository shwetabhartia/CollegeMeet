import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Post = ({pid, type, title, topicName, content, uid, selectedPost, onClick}) => (
  <ListGroupItem header={title} active={pid === selectedPost ? true : null} onClick={onClick}>
    {content}
    <br /><br />
    <small>Posted in <a href={'/topic/' + topicName}>{topicName}</a> by <a href={'/user/' + uid}>{uid}</a></small>
  </ListGroupItem>
);

export default Post;
