import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile" className="profile-page">
        <Header />
      </div>
    );
  }
}

export default Profile;
