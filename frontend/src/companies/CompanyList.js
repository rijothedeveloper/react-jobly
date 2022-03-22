import CompanyCard from "./CompanyCard";
import './companies.css';

const CompanyList = ({companies = [] }) => {
    const components = companies.map( e => <CompanyCard company={e} /> )
    return (
        <div className="companyList" >
            {components}
        </div>
    )
}

export default CompanyList;