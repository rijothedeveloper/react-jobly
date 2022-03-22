import { useEffect, useState } from "react";
import JoblyApi from "../api";
import CompanyList from "./CompanyList";
import './companies.css'
import SearchForm from "../search/SearchForm";


const Companies = () => {

    const [companies, setCompanies] = useState();
    const [filter, setFilter] = useState("")
    
    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await JoblyApi.getCompanies(filter)
            setCompanies(companies);
        }
        fetchCompanies()
    },[filter]);

    const handleSearch = (searchTerm) => {
        setFilter(searchTerm)
    }
    
    console.log(companies);
    return(
        <>
            <SearchForm onSearch={handleSearch} />
            <CompanyList companies={companies} /> 
        </>
    );
}

export default Companies;