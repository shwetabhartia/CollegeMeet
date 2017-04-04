import React, { Component } from 'react';
import UserPageContent from './UserPageContent';
import { sendUserPageRequest } from '../actions'
import { store } from '..';
import './UserPage.css';

class UserPage extends Component {
  // componentDidMount() {
  //   const uid = this.props.params.uid
  //   store.dispatch(sendUserPageRequest(uid))
  // }

  render() {
    const uid = this.props.params.uid
    store.dispatch(sendUserPageRequest(uid))
    return (
   <div className="User">
    <UserPageContent></UserPageContent>
  </div>
    )
  }
}

export default UserPage;