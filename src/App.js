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
        books: [],
        searchResultBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
        })
    }

    findBookById = (book_id) => {
        return this.state.books.find(book => book.id === book_id)
    };

    updateBookShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((res) => {
            BooksAPI.get(book.id).then((updatedBook) => {
                this.setState(prevState => {
                    if (this.findBookById(updatedBook.id) === undefined) {
                        return { books:  [...prevState.books, updatedBook] }
                    }

                    const books = prevState.books.map(book => (
                        book.id === updatedBook.id ? updatedBook : book
                    ));

                    return { books }
                })
            })
        })
    };

    searchBook = (query) => {
        BooksAPI.search(query).then((books) => {
            this.setState({ searchResultBooks: books });
        });
    };

    clearSearchResults = () => {
        this.setState({ searchResultBooks: [] });
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
                                {this.state.shelves.filter((shelf) => shelf.id !== 'none').map((shelf) => (
                                    <BookShelf
                                        key={shelf.id}
                                        title={shelf.caption}
                                        books={this.state.books}
                                        booksToShow={this.state.books.filter((book) => book.shelf === shelf.id)}
                                        onBookShelfUpdate={this.updateBookShelf}
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
                    <div className="search-books">
                        <SearchBook searchBook={this.searchBook} clearSearchResults={this.clearSearchResults} />
                        <BookShelf
                            title="Search Results"
                            books={this.state.books}
                            booksToShow={this.state.searchResultBooks}
                            onBookShelfUpdate={this.updateBookShelf}
                        />
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
