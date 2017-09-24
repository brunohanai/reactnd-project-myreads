import React from 'react';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';

class SearchBook extends React.Component {
    componentDidMount() {
        this.props.clearSearchResults();
    }

    handleChange = (e) => {
        e.preventDefault();

        const searchTerm = e.target.value;

        if (searchTerm === '' || searchTerm.length < 3) {
            this.props.clearSearchResults();
            return;
        }

        this.props.searchBook(searchTerm);
    };

    render() {
        return (
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={1000}
                        onChange={this.handleChange}
                        type="text"
                        name="query"
                        placeholder="Search by title or author"
                    />
                </div>
            </div>
        )
    }
}

export default SearchBook;