import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './JobCard.css'

const JobCard = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsList
  return (
    <li className="job-list-elements">
      <Link className="whole-job" to={`/jobs/${id}`}>
        <div className="company-details">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div className="job-div-details">
            <h1 className="job-heading">{title}</h1>
            <div className="ratings">
              <AiFillStar className="star" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-details">
          <div className="location-div">
            <div className="location-icons">
              <GoLocation className="location" />
              <p>{location}</p>
            </div>
            <div className="location-icons">
              <BsFillBriefcaseFill className="location type-emp" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-side-heading">Description</h1>
        <p className="job-para">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
