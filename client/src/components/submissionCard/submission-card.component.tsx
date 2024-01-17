import { useEffect } from "react"
import { submissionType } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import './submission-card.styles.css'
type SubmissionCardType = {
  submission: submissionType
}

const SubmissionCard = ({ submission }: SubmissionCardType) => {
  useEffect(() => {
    console.log(submission)
  }, [])
  return (
    <div className="submission-card">

    </div>
  )
}
export default SubmissionCard