import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import Book from './Book'
import './../css/App.css'


class Search extends React.Component {

  state = {
    query: '',
    searchResults: [],
    books: [],
    noResults: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query === '') {
      this.setState({ searchResults: [], noResults: '' })
    } else { this.searchBooks(query) }
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((searchResults) => {
      if (searchResults.length > 0) {
        this.addShelftoResults(this.state.books, searchResults)
      } else {
        this.setState({ searchResults: [], noResults: 'No results' })
      }
    })
  }

  addShelftoResults = (books, searchResults) => {
    this.setState({
      searchResults: searchResults.map( result => {
        books.forEach( book => {
          if (book.id === result.id) {
            result.shelf = book.shelf
          }
        })
        return result
      })
    })
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
                : this.state.noResults
            }
          </ol>
        </div>
      </div>

    )
  }
}

export default Search
