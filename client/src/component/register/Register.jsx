import './register.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authAction';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});  
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }
    this.props.registerUser(user, this.props.history);
    
    // axios.post('/api/user/register', user)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));

  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps})
    }
  }

  render() {
    const { username, password, firstname, lastname } = this.props.errors;

    return (  
      <div className='register-body'>
        <div className="form-container">
          <h1>Let's get Started !</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-control">   
              <label>Username</label><br />
              <input type="text" placeholder="Username" name='username' value={this.state.username} onChange={this.onChange}/>
              <div className='error-handling'>
                {username ? username : ''}
              </div>
            </div>
            
            <div className="form-control">
              <label>Password</label><br />
              <input type="password" placeholder="Password" name='password' value={this.state.password} onChange={this.onChange}/>
              <div className='error-handling'>
                {password ? password : ''}
              </div>
            </div>
            <div className="form-control">
              <label>First Name</label><br />
              <input type="text" placeholder="First Name" name='firstname' value={this.state.firstname} onChange={this.onChange}/>
              <div className='error-handling'>
                {firstname ? firstname : ''}
              </div>
            </div>
            <div className="form-control">
              <label>Last Name</label><br />
              <input type="text" placeholder="Last Name" name='lastname' value={this.state.lastname} onChange={this.onChange}/>
              <div className='error-handling'>
                {lastname ? lastname : ''}
              </div>
            </div>
            <div className="form-control">
              <button type='submit'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Register.protoType = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));