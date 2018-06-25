import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

  render() {

    const booksToRender = this.props.books.filter(book => book.shelf === this.props.shelf)

    if (booksToRender.length < 1) {
      return null
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksToRender.map(book => <Book details={book} key={book.id} changeShelf={this.props.changeShelf} />)}
          </ol>
        </div>
      </div>

    )
  }
}

export default Shelf