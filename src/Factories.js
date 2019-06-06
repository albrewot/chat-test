const uuidv4 = require("uuid/v4");

//Create user

const createUser = ({ name = "" } = {}) => ({
  id: uuidv4(),
  name
});

//create Message

const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender
});

//create chat
const createChat = ({
  messages = [],
  name = "Chat Global",
  users = []
} = {}) => ({
  id: uuidv4(),
  name,
  messages,
  users,
  typingUsers: []
});

const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createUser,
  createMessage,
  createChat
};
