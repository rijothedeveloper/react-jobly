import { useState } from "react"
import "./search.css"
const SearchForm = ({onSearch}) => {
    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchTerm)
    }

    const [searchTerm, setSearchTerm] = useState("")
    return (
            <form >
                <div className="searchform" > 
                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value) } />
                <button type="submit" onClick={handleSearch} >Submit</button>
                </div>
            </form>
        
    )
}

export default SearchForm;