import React, { Component } from "react";
import { ToDoItemsConsumer } from "./Context";

export default class EventComponent extends React.Component {
  state = {
    x: null,
    y: null
  };
  handleMouseMove = e => {
    const posX = e.nativeEvent.clientX;
    const posY = e.nativeEvent.clientY;

    this.setState(({ x, y }) => {
      return {
        x: posX,
        y: posY
      };
    });
  };
  render() {
    return (
      <>
        <ToDoItemsConsumer>
          {props => {
            console.log(props);
            return (
              <div
                onMouseMove={this.handleMouseMove}
                onClick={() =>
                  props.actions.getPositionClick(this.state.x, this.state.y)
                }
                style={{ height: "100%" }}
              >
                {this.props.event.title}
              </div>
            );
          }}
        </ToDoItemsConsumer>
      </>
    );
  }
}
