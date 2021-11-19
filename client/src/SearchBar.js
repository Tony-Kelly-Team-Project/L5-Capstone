import React from "react"
import "./SearchBar.css"




function SearchBar(props) {
    console.log("searchbar props.titleSearch", props.titleSearch)

    return (
        <div className="search-bars-group">
            <div className="title-searchbar">
                <input
                    type="search"
                    className="search-bar-title"
                    placeholder="Search By Title ..."
                    onChange={props.handleChangeTitle}
                />
                <button className="search-title-btn" onClick={props.titleSearch}>Submit Search</button>
            </div>

            <div className="category-searchbar">
                <input
                    type="search"
                    className="search-bar-category"
                    placeholder="Search By Category ..."
                    onChange={props.handleChangeCategory}
                />
                <button className="search-category-btn" onClick={props.categorySearch}>Submit Search</button>
            </div>
        </div>
    );
}

export default SearchBar;