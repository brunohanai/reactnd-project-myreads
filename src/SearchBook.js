import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class SearchBook extends React.Component {
    state = {
        books: []
    };

    handleChange = (e) => {
        e.preventDefault();

        const searchTerm = e.target.value;

        if (searchTerm === '' || searchTerm.length < 3) {
            this.setState({books: []});
            return;
        }

        BooksAPI.search(e.target.value).then((books) => {
            this.setState({ books: books });
        });
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.handleChange} type="text" name="query" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf title="Search" books={this.state.books}/>
                </div>
            </div>
        )
    }
}

export default SearchBook;