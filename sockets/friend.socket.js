const sendFriendRequest = require("../models/user.model").sendFriendRequest;

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("sendFriendRequest", (data) => {
      console.log(data);
      sendFriendRequest(data)
        .then(() => {
          socket.emit("requestSent");
          io.to(data.ownerId).emit("newFriendRequest", {
            friendName: data.userName,
            friendId: data.userId,
          });
        })
        .catch((err) => {
          console.log(err.message);
          socket.emit("requestFailed");
        });
    });
  });
};
