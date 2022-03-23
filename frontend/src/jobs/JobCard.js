import { Link } from "react-router-dom";
import "./jobs.css"

const JobCard = ({job}) => {
    return(
        <div className="jobCard">
            <Link to={job.id.toString()} >
                <h3>{job.title}</h3>
                <h3>{job.companyName}</h3>
                <h3>Salary: {job.salary}</h3>
                <h3>Equity: {job.equity}</h3>
            </Link>
        </div>
    )
}

export default JobCard;