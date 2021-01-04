const addBtn = document.querySelector("#addBtn") || null;

const ownerId = document.querySelector('[name="ownerId"]') || null;
const ownerName = document.querySelector('[name="ownerName"]') || null;
const userId = document.querySelector('[name="userId"]') || null;
const userName = document.querySelector('[name="userName"]') || null;

if (addBtn) {
  addBtn.onclick = (event) => {
    event.preventDefault();
    socket.emit("sendFriendRequest", {
      ownerId: ownerId.value,
      ownerName: ownerName.value,
      userId: userId.value,
      userName: userName.value,
    });
  };
}

socket.on("requestSent", () => {
  if (addBtn) {
    addBtn.remove();
  }

  document.querySelector("#friend-form").innerHTML += `<input
  type="submit"
  value="Cancel Request"
  class="btn btn-danger"
  formaction="/friend/cancel"
/>`;
});
