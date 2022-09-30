import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './LoginForm.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isLoginFailed: false}

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({isLoginFailed: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isLoginFailed, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <form className="form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="username-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>

          <div className="username-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {isLoginFailed && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
