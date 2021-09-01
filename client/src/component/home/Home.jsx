import './home.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div class='body'>
        <h1>Welcome To<br/>brad !</h1>
      </div>
    )
  }
}

Home.protoType = {
  auth: PropTypes.object.isRequired
} 
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));
