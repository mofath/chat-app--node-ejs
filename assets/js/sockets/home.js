socket.emit("getOnlineFriends", userId);

socket.on("onlineFriends", (onlineFriends) => {
  let div = document.getElementById("onlineFriends");
  console.log(onlineFriends);
  if (onlineFriends.length === 0) {
    div.innerHTML = `<p class="alert alert-danger">No online friends</p>`;
  } else {
    div.innerHTML = `<p class="alert alert-danger">No online friends</p>`;
    let html = `<div class="row"></div>`;
    for (let friend of onlineFriends) {
      html += `<div class="col col-12 col-md-6 col-lg-4">
      <div class="row">
        <a href="/profile/${friend.id}">
          <h3>${friend.name}</h3>
        </a>
        <span>chat</span>
      </div>
      </div>`;
    }
    div.innerHTML = html;
  }
});
