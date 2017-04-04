import React from 'react';
import Topic from './Topic';
import { ListGroup } from 'react-bootstrap';

const TopicList = ({ topics }) => (
  <ListGroup>
    {topics.map(topic => 
      <Topic key={topic} topicName={topic}></Topic>
    )}
  </ListGroup>
);

export default TopicList;
