import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
    state = {
        shelves: [
            {"id": "currentlyReading", "caption": "Currently Reading"},
            {"id": "wantToRead", "caption": "Want to Read"},
            {"id": "read", "caption": "Read"},
            {"id": "none", "caption": "None"},
        ],
        books: []
    };
    
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {this.state.shelves.map((shelf) => (
                                    <BookShelf
                                        key={shelf.id}
                                        title={shelf.caption}
                                        books={this.state.books.filter((book) => book.shelf === shelf.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={() => (
                    <SearchBook/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
