import Cookies from 'js-cookie'

import {Component} from 'react'
import './Profile.css'

class Profile extends Component {
  state = {userDetails: {}}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = {
      profileDetails: data.profile_details,
    }

    const updatedProfileData = {
      name: updatedData.profileDetails.name,
      profileImageUrl: updatedData.profileDetails.profile_image_url,
      shortBio: updatedData.profileDetails.short_bio,
    }
    this.setState({userDetails: updatedProfileData})
  }

  render() {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt={name} className="profile-image" />
        <h1 className="profile-heading"> {name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }
}

export default Profile
