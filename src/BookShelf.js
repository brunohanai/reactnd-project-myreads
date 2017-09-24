import React from 'react';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    };

    updateBookShelf = (e, book) => {
        this.props.onBookShelfUpdate(book, e.target.value);
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.booksToShow.map((book) => {
                            let bookShelf = book.shelf;

                            if (bookShelf === undefined) {
                                const userBook = this.props.books.find(_ => _.id === book.id)
                                bookShelf = (userBook !== undefined ? userBook.shelf : 'none');
                            }

                            return (
                                <li key={book.id}>
                                    {/*TODO: this could be a Book component*/}
                                    <div className="book">
                                        <div className="book-top">
                                            <div
                                                className="book-cover"
                                                style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                                                }}
                                            ></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(e) => this.updateBookShelf(e, book)} defaultValue={bookShelf}>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div
                                            className="book-authors">{book.authors !== undefined && book.authors.join(' / ')}</div>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;