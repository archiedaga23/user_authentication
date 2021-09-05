import React, { Component } from 'react';
import './create-profile.css';

import image from './user.png';
class CreateProfile extends Component {
  render() {
    return (
      <div className='create-profile-body'>
        <div className="create-profile-container">
          <form>
            <h1>Public Profile</h1>
            <div className="profile-picture-container">
              <div className='image-container'>
                <div>
                  <img src={image} style={{width: '120px'}} alt="avatar"/>
                </div> 
                <div className="btn-container">
                  <div>
                    <button className='btn1'>Change picture</button>
                  </div>
                  <div>
                    <button className='btn2'>Delete picture</button>
                  </div>
                </div>
              </div>
  
              <div className="profile-form-control name-input">
                <div>
                  <label>First name</label><br />
                  <input type="text" />                  
                </div>
                <div>
                  <label>Fast name</label><br />
                  <input type="text" />
                </div>
              </div>
              <div className="profile-form-control">
                <label>Location</label><br />
                <input type="text" />
              </div>
              <div className="profile-form-control">
                <label>Email</label><br />
                <input type="text" />
              </div>
              <div className="profile-form-control">
                <label>Contact number</label><br />
                <input type="text" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateProfile;
