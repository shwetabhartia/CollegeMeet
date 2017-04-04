import React from 'react';
import Post from './Post';
import { ListGroup } from 'react-bootstrap';

const PostList = ({ posts }) => (
  <ListGroup>
      {posts.map(post => 
        <Post key={post.pid} pid={post.pid} title={post.title} type={post.type} topicName={post.topicName} content={post.content} uid={post.uid} active="false"></Post>
       )}
  </ListGroup>
);

export default PostList;
