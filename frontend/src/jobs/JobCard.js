import { useContext } from "react";
import { currentUserContext } from "../App";
import "./jobs.css"

const JobCard = ({job, onApply}) => {
    const user = useContext(currentUserContext)
    const onApplyClicke = () => {
        onApply(user.username, job.id);
    }
    return(
        <div className="jobCard">
            <div className="leftAlign">
                <h3>{job.title}</h3>
                <h3>{job.companyName}</h3>
                <h3>Salary: {job.salary}</h3>
                <h3>Equity: {job.equity}</h3>
            </div>
            <div className="applyButton">
                <button onClick={onApplyClicke}>Apply</button>
            </div>
        </div>
    )
}

export default JobCard;