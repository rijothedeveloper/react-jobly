import JobCard from "./JobCard"
import "./jobs.css"


const JobList = ({jobs=[]}) => {

    return(
        <div className="jobList">
            { jobs.map( job => <JobCard job={job} />) }
        </div>
    )
}

export default JobList;