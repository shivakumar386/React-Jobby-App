import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'

import './SimilarCard.css'

const SimilarCard = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsData
  return (
    <li className="similar-bg-container">
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
      <p className="job-desc">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarCard
