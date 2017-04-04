import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PostBox from './PostBox';
import SelectablePostList from './SelectablePostList';

import './TopicPageContent.css';

import { updateUserLike } from '../actions';

const TopicPageContent = ({name, posts, description, handleClick}) => (
    <div id="tpcontent">
        <h1>{name}</h1>{' '}<Button bsSize="small" onClick={handleClick}>Like</Button>
        {description}
        <h2>Recent Posts</h2>
        <PostBox></PostBox>
        <SelectablePostList posts={posts}></SelectablePostList>
    </div>
);

const mapStateToProps = ({ topicPage }) => ({
    name: topicPage.name,
    posts: topicPage.posts,
    description: topicPage.description
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick(e) {
            dispatch(updateUserLike())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPageContent);