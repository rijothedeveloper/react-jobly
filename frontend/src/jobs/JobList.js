import JoblyApi from "../api"
import JobCard from "./JobCard"
import "./jobs.css"


const JobList = ({jobs=[]}) => {

    const applyButtonClicked = (username,jobId) => {
        JoblyApi.applyJob(username,jobId)
    }

    return(
        <div className="jobList">
            { jobs.map( job => <JobCard job={job} onApply={applyButtonClicked} />) }
        </div>
    )
}

export default JobList;