const socket = io();

socket.on("connect", () => {
  const ownerId = document.querySelector('[name="ownerId"]') || null;
  if (ownerId) socket.emit("joinNotificationsRoom", ownerId.value);
});

socket.on("newFriendRequest", (data) => {
  alert(2);
  console.log(data);
  alert(`hi, i'm ${data.friendName}`);
  const friendReuests = document.querySelector("#friendRequests");
  const span = friendReuests.querySelector("span");
  if (span) span.remove();
  friendReuests.innerHTML += `
  <a class="dropdown-item" href="/profile/${data.friendId}">
   ${data.friendName}
  </a>`;
  const btn = document.getElementById("friendRequestsDropdown");
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-danger");
});

const btn = document.getElementById("friendRequestsDropdown");
btn.onclick = () => {
  btn.classList.remove("btn-danger");
  btn.classList.add("btn-primary");
};
