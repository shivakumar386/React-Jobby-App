import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Profile from '../Profile/Profile'
import FiltersGroup from '../FiltersGroup/FiltersGroup'
import JobCard from '../JobCard/JobCard'

import './AllJobsSection.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    employmentType: '',
    miniumPackage: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employmentType, miniumPackage, searchInput} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${miniumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedJobDetails = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobDetails,
      })
    }
  }

  onChangeCheckBoxFiller = employmentTypeId => {
    this.setState({employmentType: employmentTypeId}, this.getJobs)
  }

  onChangeRadioFiller = salaryRangeId => {
    this.setState({miniumPackage: salaryRangeId}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobs)
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.onChangeSearchInput()
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProducts = () => {
    const {jobsList} = this.state
    return (
      <ul className="ul-elements">
        {jobsList.map(eachJob => (
          <JobCard jobsList={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="all-jobs-container">
        <div className="jobs-left-container">
          <Profile />
          <hr className="seperator" />

          <FiltersGroup
            onChangeCheckBoxFiller={this.onChangeCheckBoxFiller}
            onChangeRadioFiller={this.onChangeRadioFiller}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        </div>
        <div>
          <div className="jobs-search">
            <input
              type="search"
              placeholder="Search"
              className="search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onKeyDownSearch}
            />
            <BsSearch className="search-icon" />
          </div>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
