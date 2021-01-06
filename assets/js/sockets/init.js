const socket = io();
const userId = document.querySelector("#userId").value;
const btn = document.getElementById("friendRequestsDropdown");

socket.on("connect", () => {
  socket.emit("joinNotificationsRoom", userId);
  socket.emit("goOnline", userId);
});

socket.on("newFriendRequest", (data) => {
  const friendReuests = document.querySelector("#friendRequests");
  const span = friendReuests.querySelector("span");
  if (span) span.remove();
  friendReuests.innerHTML += `
  <a class="dropdown-item" href="/profile/${data.friendId}">
   ${data.friendName}
  </a>`;
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-danger");
});

btn.onclick = () => {
  btn.classList.remove("btn-danger");
  btn.classList.add("btn-primary");
};
