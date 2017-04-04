import React from 'react';
import { Grid, Panel, Tab, Tabs, Row, Col } from 'react-bootstrap';
import PostList from '../lists/PostList';
import CommentList from '../lists/CommentList';
import TopicList from '../lists/TopicList';
import { connect } from 'react-redux';

const UserPageContent = ({ userPage }) => (
    <Grid>
      <Panel>
        <h1 id="title">{userPage.name}</h1>
        <Tabs defaultActiveKey={1}>  
          <Tab eventKey={1} title="Description">{userPage.description}</Tab>
          <Tab eventKey={2} title="Likes"><TopicList topics={userPage.likes}></TopicList></Tab>
        </Tabs>
      <Row>
        <Col md={6}>
            <h2>Recent Posts</h2>
            <PostList posts={userPage.posts}></PostList>
        </Col>
        <Col md={6}>
            <h2>Recent Comments</h2>
            <CommentList comments={userPage.comments}></CommentList>
        </Col>
      </Row>
      </Panel>
    </Grid>
)

const mapStateToProps = ({ userPage }) => ({
    userPage
})

export default connect(mapStateToProps)(UserPageContent);