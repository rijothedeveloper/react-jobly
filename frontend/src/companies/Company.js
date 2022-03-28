import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobList from "../jobs/JobList";

const Company = () => {
    const { companyHandle } = useParams()
    const [company, setCompany] = useState();
    useEffect( () => {
        const fetchCompanyInfo = async () => {
            const company = await JoblyApi.getCompany(companyHandle)
            setCompany(company)
        }
        fetchCompanyInfo();
    },[])
    if(!company) {
        return(<h1>Loading...</h1>)
    } else {
        return(
            <>
                <h1>{company.name}</h1>
                <p>{company.description}</p>
                <JobList jobs={company.jobs} />
            </>
        )
    }
}

export default Company;