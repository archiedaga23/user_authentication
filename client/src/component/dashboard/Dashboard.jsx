import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profileAction'; 

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);