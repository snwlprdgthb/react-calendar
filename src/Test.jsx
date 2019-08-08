import React from "react";
import Calendar from "react-big-calendar";
import events from "./events";
import moment from "moment";
import Form from "./Form";
import update from "react-addons-update";
import EventComponent from "./EventComponent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

import { ToDoItemsProvider } from "./Context";

const localizer = Calendar.momentLocalizer(moment);

class Selectable extends React.Component {
  state = {
    events,
    showEventModal: false,
    showModal: false,
    X: null,
    Y: null,
    start: "",
    end: "",
    title: "",
    body: ""
  };

  handleSelect = e => {
    this.setState(({ showModal, X, Y, start, end }) => {
      return {
        showModal: !this.state.showModal,
        showEventModal: false,
        X: e.box.clientX,
        Y: e.box.clientY,
        start: e.start,
        end: e.end
      };
    });
  };

  toggleModal = () => {
    this.setState(({ showEventModal, showModal }) => {
      return {
        showEventModal: !this.state.showEventModal,
        showModal: false
      };
    });
  };

  closeModal = () => {
    this.setState(({ showModal, showEventModal }) => {
      return {
        showModal: !this.state.showModal,
        showEventModal: false
      };
    });
  };

  closeEventModal = () => {
    this.setState(({ showEventModal }) => {
      return {
        showEventModal: !this.state.showEventModal
      };
    });
  };

  saveTask = ({ title, body }) => {
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            body: body,
            title: title,
            end: this.state.end,
            start: this.state.start
          }
        ],
        showModal: false
      });
    }
  };

  editEvent = (title, body, start) => {
    let initialValue = [];

    const newArr = this.state.events.reduce((init, obj) => {
      if (obj.start === start) {
        let a;
        a = update(obj, { title: { $set: title }, body: { $set: body } });
        return [...init, a];
      } else {
        return [...init, obj];
      }
    }, initialValue);

    this.setState({ events: newArr, showModal: false });
  };

  selectEvent = e => {
    console.log(e);

    this.setState(({ title, body }) => {
      return { title: e.title, body: e.body };
    });
    this.toggleModal();
  };

  getPositionClick(x, y) {
    this.setState(({ X, Y }) => {
      return {
        X: x,
        Y: y
      };
    });
  }

  render() {
    const { title, body } = this.state;
    const value = { title, body };

    return (
      <>
        <ToDoItemsProvider
          value={{
            events: this.state.events,

            actions: {
              editEvent: (title, body, start) =>
                this.editEvent(title, body, start),
              getPositionClick: (x, y) => this.getPositionClick(x, y)
            }
          }}
        >
          <div className="main">
            <Calendar
              selectable
              localizer={localizer}
              events={this.state.events}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={this.selectEvent}
              onSelectSlot={this.handleSelect}
              style={{ height: "100vh" }}
              components={{
                event: EventComponent
              }}
            />
            {this.state.showModal ? (
              <Form
                saveTask={this.saveTask}
                closeModal={this.closeModal}
                x={this.state.X}
                y={this.state.Y}
              />
            ) : null}
            {this.state.showEventModal ? (
              <Form
                edit
                closeModal={this.closeEventModal}
                toggleModal={this.toggleModal}
                start={this.state.start}
                value={value}
                x={this.state.X}
                y={this.state.Y}
              />
            ) : null}
          </div>
        </ToDoItemsProvider>
      </>
    );
  }
}

export default Selectable;
