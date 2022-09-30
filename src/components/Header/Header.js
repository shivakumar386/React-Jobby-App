import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './Header.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="header-container">
      <div className="header-nav-elements">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
          onClick={onClickLogo}
        />
        <ul className="header-link-elements">
          <li className="header-para">
            <Link to="/" className="link-elements">
              Home
            </Link>
          </li>
          <li className="header-para">
            <Link to="/jobs" className="link-elements">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="header-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
