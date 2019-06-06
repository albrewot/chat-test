import React, { Component } from "react";

import { VERIFY_USER } from "../Events";

export default class LoginForm extends Component {
  state = {
    nickname: "",
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  setUser = ({ user, isUser }) => {
    const { setUser } = this.props;
    console.log(user, isUser);
    if (isUser) {
      this.setError("Nombre de usuario ya existe");
    } else {
      this.setState({ error: null });
      setUser(user);
    }
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    const { error, nickname } = this.state;
    return (
      <div
        className="container"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Ingresa un nombre de usuario</h2>
          </label>
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder="..."
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}
