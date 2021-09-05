import './login.css';
import React, { Component } from 'react'

import { loginUser } from '../../action/authAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); 
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value});
   
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
  
    this.props.loginUser(user); 
}

  render() {

    const { username, password } = this.props.errors;

    return (
      <div className='register-body'>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-control">
              <label>Username</label><br />
              <input type="text" placeholder="Username" name='username' value={this.state.username} onChange={this.onChange}/>
              <div className="error-handling">
                {username ? username : ""}
              </div>
            </div>
            <div className="form-control">
              <label>Password</label><br />
              <input type="text" placeholder="Password" name='password' value={this.state.password} onChange={this.onChange}/>
              <div className="error-handling">
                {password ? password : ""}
              </div>
            </div>
            <div className="form-control">
              <button type='submit'>Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));