module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinNotificationsRoom", (id) => {
      socket.join(id);
    });
  });
};
