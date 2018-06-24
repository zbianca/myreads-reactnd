import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

  render() {

    const thumb = `url('${this.props.details.imageLinks.thumbnail}')`
    let title = this.props.details.title
    if (this.props.details.subtitle) {
      title += `: ${this.props.details.subtitle}`
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumb }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.details.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{this.props.details.authors.join(', ')}</div>
        </div>
      </li>

    )
  }
}

Book.propTypes = {
  details: PropTypes.object.isRequired,
}

export default Book