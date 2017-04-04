import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { navigateTopicPage } from '../navigation';

const Topic = ({topicName}) => (
  <ListGroupItem onClick={() => {navigateTopicPage(topicName)}}>
    {topicName}
  </ListGroupItem>
);

export default Topic;
