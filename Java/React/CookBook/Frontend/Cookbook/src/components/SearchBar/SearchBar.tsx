import {useRef, useState} from "react"
import "./SearchBar.scss"
import { FaSearch } from "react-icons/fa";

interface SearchBarProps{
    onSearch: (value:string) => void;
    placeholder?: string;
    onFocusChange: (focused: boolean) => void;
}

function SearchBar ({
    onSearch,
    onFocusChange,
    placeholder = "Cauta..."
}: SearchBarProps) {
    
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);    

    const handleChange = (value:string) => {
        setSearchTerm(value);
        onSearch(value);
    }

    const handleClear = () => {
        setSearchTerm("");
        onSearch("");
    }

    return (
        <form className="search-bar">
            <input type="text"
                    ref={inputRef}
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    onFocus={() => onFocusChange(true)}
                    onBlur={() => onFocusChange(false)}
                   />
                   <FaSearch className="search-bar__icon"
                   onMouseDown={(e) => {
                        e.preventDefault();
                        inputRef.current?.focus();
                    }}/> 
                
            {searchTerm && (
                <button type="button"
                        className="search-bar__clear"
                        onClick={handleClear}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
            )}
        </form>
    )
}

export default SearchBar;