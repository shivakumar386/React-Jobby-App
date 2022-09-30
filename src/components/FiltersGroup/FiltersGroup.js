import './FiltersGroup.css'

const FiltersGroup = props => {
  const checkBoxes = () => {
    const {employmentTypesList, onChangeCheckBoxFiller} = props

    return employmentTypesList.map(eachEmployment => {
      const onChangeCheckbox = () =>
        onChangeCheckBoxFiller(eachEmployment.employmentTypeId)

      return (
        <li
          key={eachEmployment.employmentTypeId}
          className="employ-list-elements"
        >
          <input
            type="checkbox"
            className="employ-check-box"
            onChange={onChangeCheckbox}
          />
          <label>{eachEmployment.label}</label>
        </li>
      )
    })
  }

  const radioBoxes = () => {
    const {salaryRangesList, onChangeRadioFiller} = props

    return salaryRangesList.map(eachSalary => {
      const onChangeRadio = () => onChangeRadioFiller(eachSalary.salaryRangeId)

      return (
        <li key={eachSalary.salaryRangeId} className="employ-list-elements">
          <input
            type="radio"
            className="employ-check-box"
            onChange={onChangeRadio}
            name="radio"
          />
          <label>{eachSalary.label}</label>
        </li>
      )
    })
  }

  return (
    <>
      <div>
        <h1 className="jobs-left-heading">Type of Employment</h1>
        {checkBoxes()}
      </div>
      <hr className="seperator" />
      <div>
        <h1 className="jobs-left-heading">Salary Range</h1>
        {radioBoxes()}
      </div>
    </>
  )
}

export default FiltersGroup
