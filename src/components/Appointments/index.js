// Write your code here

import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import GetItem from '../AppointmentItem'

class Appointment extends Component {
  state = {appointmentList: [], title: '', date: '', showStarred: false}

  filterList = () => {
    const {appointmentList, showStarred} = this.state

    if (showStarred) {
      return appointmentList.filter(eachItem => eachItem.isStarred)
    }
    return appointmentList
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateList = date.split('-')
    console.log(dateList)
    const resDate = format(
      new Date(dateList[0], dateList[1] - 1, dateList[2]),
      'dd MMMM yyyy, EEEE',
    )

    const newAppointment = {
      id: v4(),
      title,
      date: resDate,
      isStarred: false,
    }

    this.setState(previousList => ({
      appointmentList: [...previousList.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  onlyStarred = () => {
    this.setState(previousState => ({showStarred: !previousState.showStarred}))
  }

  updateStar = id => {
    this.setState(previousState => ({
      appointmentList: previousState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const filteredList = this.filterList()
    const {title, date, showStarred} = this.state
    console.log(showStarred)
    const button2Class = showStarred ? 'starred' : ''
    console.log(filteredList)

    return (
      <div className="main">
        <div className="content">
          <div className="inputContainer">
            <h1 className="h1">Add Appointment</h1>
            <div className="part1">
              <form className="form" onSubmit={this.addAppointment}>
                <div className="inputContainer1">
                  <label className="label1" htmlFor="input1">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="input1"
                    id="input1"
                    placeholder="Title"
                    onChange={this.updateTitle}
                    value={title}
                  />
                </div>
                <div className="inputContainer2">
                  <label className="label2" htmlFor="input2">
                    DATE
                  </label>
                  <input
                    value={date}
                    onChange={this.updateDate}
                    type="date"
                    className="input2"
                    id="input2"
                  />
                </div>
                <button type="submit" className="button1">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image1"
              />
            </div>
          </div>
          <hr className="hr1" />

          <div className="header">
            <h1 className="h2">Appointments</h1>
            <button
              type="button"
              className={`button2 ${button2Class}`}
              onClick={this.onlyStarred}
            >
              Starred
            </button>
          </div>

          <div className="Appointments">
            <ul className="ul">
              {filteredList.map(eachItem => (
                <GetItem
                  listItem={eachItem}
                  clickedStar={this.updateStar}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
