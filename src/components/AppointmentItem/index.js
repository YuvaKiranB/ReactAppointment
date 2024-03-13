// Write your code here
import './index.css'

const GetItem = props => {
  const {listItem, clickedStar} = props
  const {id, title, date, isStarred} = listItem

  const updateStar = () => {
    clickedStar(id)
  }

  return (
    <li className="li">
      <div className="textContainer">
        <p className="title">{title}</p>
        <p className="p1">{date}</p>
      </div>
      <button
        data-testid="star"
        onClick={updateStar}
        type="button"
        className="button3"
      >
        {isStarred ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            className="image2"
            alt="star"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            className="image2"
            alt="star"
          />
        )}
      </button>
    </li>
  )
}

export default GetItem
