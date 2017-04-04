import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Comment = ({cid, pid, uid, name, email, content}) => (
  <ListGroupItem header={name}>
      {content}
      <br /><br />
      <small>In response to {pid} by <a href={'/user/' + uid}>{uid}</a></small>
  </ListGroupItem>
);

export default Comment;
