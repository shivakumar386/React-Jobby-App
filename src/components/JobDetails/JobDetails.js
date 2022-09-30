import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'

import {Component} from 'react'
import Header from '../Header/Header'
import SimilarCard from '../SimilarCard/SimilarCard'
import './JobDetails.css'

class JobDetails extends Component {
  state = {jobData: {}, similarJobsData: []}

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
  })

  getSimilarJobs = data =>
    data.map(eachData => ({
      companyLogoUrl: eachData.company_logo_url,
      employmentType: eachData.employment_type,
      id: eachData.id,
      jobDescription: eachData.job_description,
      location: eachData.location,
      rating: eachData.rating,
      title: eachData.title,
    }))

  getJobData = async () => {
    const {jobData} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = this.getFormattedData(data)
      const updatedSimilarJobs = this.getSimilarJobs(data.similar_jobs)
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobs,
      })
    }
  }

  render() {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData
    return (
      <>
        <Header />
        <div className="detail-bg-container">
          <div className="detailed-job">
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
          </div>
          <h1 className="details-heading">Similar Jobs</h1>
          <ul className="similar-main-conatiner">
            {similarJobsData.map(eachData => (
              <SimilarCard similarJobsData={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobDetails
