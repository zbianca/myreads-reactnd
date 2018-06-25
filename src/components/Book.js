import React from 'react'
import PropTypes from 'prop-types'
import noImage from '../icons/noimage.png'

class Book extends React.Component {

  static propTypes = {
    details: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    this.props.changeShelf(this.props.details, event.target.value)
  }

  render() {

    const thumb = this.props.details.imageLinks? this.props.details.imageLinks.thumbnail : noImage
    let title = this.props.details.title
    if (this.props.details.subtitle) {
      title += `: ${this.props.details.subtitle}`
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${thumb}')` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.details.shelf? this.props.details.shelf : 'none'} onChange={this.handleChange} >
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{this.props.details.authors? this.props.details.authors.join(', ') : this.props.details.publisher}</div>
        </div>
      </li>

    )
  }
}

export default Book