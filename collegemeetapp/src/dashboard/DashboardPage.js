import React, { Component } from 'react';
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap';
import { sendDashboardPageRequest } from '../actions';
import { store } from '../index';
import PostList from '../lists/PostList';
import TopicList from '../lists/TopicList';

class DashboardPage extends Component {
    componentDidMount() {
        const uid = store.getState().session.uid;
        store.dispatch(sendDashboardPageRequest(uid))
    }

    render() {
        return (
        <div className="Dashboard">
            <Grid>
                <Row>
                    <Panel>
                        <PageHeader>Dashboard</PageHeader>
                    <Col md={5}>
                        <h1>Your Likes</h1>
                        <TopicList topics={store.getState().dashboardPage.topics}></TopicList>
                    </Col>
                    <Col md={7}>
                        <h1>Recent Activity</h1>
                        <PostList posts={store.getState().dashboardPage.posts}></PostList>
                    </Col>
                    </Panel>
                </Row>
            </Grid>
        </div>
        )
    }
}

export default DashboardPage;