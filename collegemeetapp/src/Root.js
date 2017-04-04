import React, { Component } from 'react';
import AppNavbar from './navbar/Navbar';

export default class Root extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        {this.props.children}
      </div>
    );
  }
}
