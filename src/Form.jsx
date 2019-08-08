import React, { Component } from "react";
import FormView from "./FormView";

import { ToDoItemsConsumer } from "./Context";

class Form extends Component {
  state = {
    title: "",
    body: "",
    edit: false
  };

  onSubmit = (e, actions) => {
    console.log(this.props);

    const { title, body } = this.state;
    if (this.props.edit) {
      this.props.toggleModal();
      e.preventDefault();
      actions.editEvent(title, body, this.props.start);
    } else {
      this.props.saveTask({ title, body });
    }

    e.preventDefault();
  };

  toggleEdit = () => {
    this.setState(({ edit }) => {
      return {
        edit: !this.state.edit
      };
    });
  };

  render() {
    console.log(this.state);

    if (this.props.edit && !this.state.edit) {
      return (
        <div
          className="myForm"
          style={{
            top: `${this.props.y + 50}px`,
            left: `${this.props.x - 100}px`
          }}
        >
          <div className="close" onClick={this.props.closeModal}>
            <div>X</div>
          </div>
          <div className="edit">
            <div className="edit-inner">
              <div>{this.props.value.title}</div>
              <div>{this.props.value.body}</div>
            </div>

            <div className="buttons">
              <button style={{ color: "red" }} className="button">
                Discard
              </button>
              <button className="button" onClick={this.toggleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.edit || !this.props.edit) {
      return (
        <ToDoItemsConsumer>
          {({ state, actions }) => {
            return (
              <FormView
                value={this.props}
                closeModal={this.props.closeModal}
                y={this.props.y}
                x={this.props.x}
                onSubmit={e => this.onSubmit(e, actions)}
                onChangeTitle={e => this.setState({ title: e.target.value })}
                onChangeBody={e => this.setState({ body: e.target.value })}
                {...state}
              />
            );
          }}
        </ToDoItemsConsumer>
      );
    }
  }
}

export default Form;
