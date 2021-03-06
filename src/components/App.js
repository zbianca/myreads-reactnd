import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import Shelf from './Shelf'
import './../css/App.css'

class App extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    )
  }

  render() {

    const { books } = this.state

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf title="Currently Reading" shelf="currentlyReading" books={books} changeShelf={this.changeShelf} />
          <Shelf title="Want to Read" shelf="wantToRead" books={books} changeShelf={this.changeShelf} />
          <Shelf title="Read" shelf="read" books={books} changeShelf={this.changeShelf} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default App
