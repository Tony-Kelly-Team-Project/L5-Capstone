import React from "react"
import "./SearchBar.css"



//need button to submit search???

function SearchBar(props) {
    return (
        <div>
            <div className="title-searchbar">
                <input
                    type="search"
                    className="search-bar-title"
                    placeholder="Search By Title ..."
                    onChange={props.handleChangeTitle}
                />
                <button className="search-title-btn" onClick={props.titleSearch}>Submit Search</button>
            </div>

            {/* <div className="category-searchbar">
                <input
                    type="search"
                    className="search-bar-category"
                    placeholder="Search By Category ..."
                    onChange={props.handleChangeCategory}
                />
                <button className="search-category-btn" onClick={props.categorySearch}>Submit Search</button>
            </div> */}
        </div>
    );
}

export default SearchBar;