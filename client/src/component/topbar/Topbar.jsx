import React, { Component } from 'react'
import './topbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../action/authAction';
import { clearCurrentProfile } from '../../action/profileAction';

class Topbar extends Component {
  
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
      const { isAuthenticated, user } = this.props.auth;

      const profile = this.props.profile.profile;
      const avatar  = profile ? profile.avatar : null;
      const image   = avatar  ? 
      <img src={avatar} style={{ width: '25px',borderRadius:'50%', border: '1px solid white' }}/> :
      <img src="https://img.icons8.com/ios/50/ffffff/user--v1.png" style={{ width: '25px', border: '2px solid white',borderRadius:'50%'}}/>
     
    const authLinks = (
      <div className="navbarlinks-container">
        <a href="/" onClick={this.onLogoutClick.bind(this)}>Logout</a>
        {image}
      </div>
    );

    const guestLinks = (
      <div className="navbarlinks-container">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    );
    return (
      <header className="topbar-container">
        <div className="logo-container">
          <h1>brad</h1>
        </div>
        { isAuthenticated ? authLinks : guestLinks }
      </header>
    )
  }
}


Topbar.propsTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { logoutUser,clearCurrentProfile })(Topbar);