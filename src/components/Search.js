import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import Book from './Book'
import './../css/App.css'


class Search extends React.Component {

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
    BooksAPI.search(query).then((searchResults) => {
      this.setState({ searchResults })
    })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    )
  }



  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (this.state.searchResults.length > 0) ?
                this.state.searchResults.map(book => <Book details={book} key={book.id} changeShelf={this.changeShelf} />)
                : null
            }
          </ol>
        </div>
      </div>

    )
  }
}

export default Search
