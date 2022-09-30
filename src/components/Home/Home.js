import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header/Header'
import './Home.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-content-container">
        <div className="home-div-container">
          <h1 className="home-heading">Find The Jobs That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button className="home-button" type="button">
            <Link className="button-link" to="/jobs">
              Find Jobs
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
