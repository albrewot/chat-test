import React, { Component } from "react";
import io from "socket.io-client";
import Layout from "../components/Layout";
import { USER_CONNECTED, LOGOUT } from "../Events";

const socketUrl = "localhost:19200";

export default class Landing extends Component {
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
    return <Layout title={"Chat App"} />;
  }
}
