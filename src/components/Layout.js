import React, { Component } from "react";
import io from "socket.io-client";

import { USER_CONNECTED, LOGOUT } from "../Events";

import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";

const socketUrl = "localhost:19200";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount = () => {
    this.initSocket();
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("user connected");
    });
    this.setState({ socket });
  };

  render() {
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
