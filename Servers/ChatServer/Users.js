const users = [];

//Used to add user
const addUser = ({ id, room, name }) => {
  name = name.trim().toLowerCase();
  room = Number(room);

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

//Used to remove user
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  //Check user of that index found
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
};

//Used to find the user
const getUser = (id) => {
  return users.find((user) => user.id === id);
};

//Used to find user in a particular room
const getUsersInRoom = (room) => {
  room = Number(room);
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
