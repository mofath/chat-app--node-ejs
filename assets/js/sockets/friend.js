const addBtn = document.querySelector("#addBtn");
const ownerName = document.querySelector('[name="ownerName"]').value;
const userName = document.querySelector('[name="userName"]').value;
const ownerId = document.querySelector('[name="ownerId"]').value;

if (addBtn)
  addBtn.onclick = (event) => {
    event.preventDefault();
    socket.emit("sendFriendRequest", {
      ownerId: ownerId,
      ownerName: ownerName,
      userId: userId,
      userName: userName,
    });
  };

socket.on("requestSent", () => {
  addBtn.remove();
  document.querySelector("#friend-form").innerHTML += `<input
  type="submit"
  value="Cancel Request"
  class="btn btn-danger"
  formaction="/friend/cancel"
/>`;
});
