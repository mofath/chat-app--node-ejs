const { sendFriendRequest, getFriends } = require("../models/user.model");

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

    socket.on("getOnlineFriends", (id) => {
      getFriends(id).then((friends) => {
        let onlineFriends = friends.filter(
          (friend) => io.onlineUsers[friend.id]
        );
        console.log(io.onlineUsers);
        socket.emit("onlineFriends", onlineFriends);
      });
    });
  });
};
