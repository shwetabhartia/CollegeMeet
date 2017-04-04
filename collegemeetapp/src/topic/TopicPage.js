import React, { Component } from 'react';
import { store } from '../index';
import { sendTopicPageRequest } from '../actions';
import TopicPageContent from './TopicPageContent';

class TopicPage extends Component {
  componentDidMount() {
    const topicName = this.props.params.name
    store.dispatch(sendTopicPageRequest(topicName))
  }

  render() {
    return (
    <div className="TopicPage">
      <TopicPageContent></TopicPageContent>
    </div>
    )
  }
}

export default TopicPage;