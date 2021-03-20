import React, { Component } from "react";
import Message from "./Message";
import Cookies from "js-cookie";
import Login from "./login/Login";
import { getAllMessage } from "../api";
import { deleteMessageByID } from "../api";

export default class Messages extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  getAllMessages = () => {
    getAllMessage()
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  deleteAllMessages = () => {
    this.state.data.forEach((e) => {
      deleteMessageByID(e._id);
    });
  };

  funcSetMessages = (newMessages) => {
    this.setState({ data: newMessages });
  };

  render() {
    let check = Cookies.get("name");
    // const data = this.state.data;

    return (
      <div className="message-main-div">
        {check ? (
          <div className="messages-div">
            <button
              className="get-messages-button"
              onClick={this.getAllMessages}
            >
              اضغط لتحديث الرسائل
            </button>

            <button
              className="delAll-messages-button"
              onClick={this.deleteAllMessages}
            >
              لحذف جميع الرسائل
            </button>

            {/* {this.state.data.length == 0 ? this.getAllMessages() : null}
            {this.state.data.length != 0 ? this.getAllMessages() : null} */}
            <hr />
            {/* <h3>All Messages</h3> */}
            <div className="messages">
              <Message
                allMessages={this.state.data}
                setMessages={this.funcSetMessages}
              />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
