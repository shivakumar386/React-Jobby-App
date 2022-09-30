import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import AllJobsSection from '../AllJobsSection/AllJobsSection'

import './Jobs.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-bg-container">
      <AllJobsSection />
    </div>
  </>
)

export default Jobs
