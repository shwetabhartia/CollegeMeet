import React from 'react';
import Post from '../lists/Post';
import { ListGroup } from 'react-bootstrap';
import CommentDisplay from './CommentDisplay';

import { connect } from 'react-redux';
import { selectPost } from '../actions';

const SelectablePostList = ({ posts, onClick }) => (
  <ListGroup>
      {posts.map(post => 
        <div>
            <Post key={post.pid} pid={post.pid} title={post.title} type={post.type} topicName={post.topicName} content={post.content} uid={post.uid} onClick={onClick}></Post>
            <CommentDisplay pid={post.pid} comments={post.comments} />
        </div>
       )}
  </ListGroup>
);

const mapStateToProps = ({ topicPage }) => ({
    posts: topicPage.posts,
})

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (e) => {
            dispatch(selectPost(e.target.pid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectablePostList);
