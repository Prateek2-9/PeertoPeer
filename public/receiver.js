(function () {
  let senderID;
  const socket = io();

  function generateID() {
    return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
      Math.random() * 999
    )}-${Math.trunc(Math.random() * 999)}`;
  }

  document
    .querySelector("#peerreceiver-start-con-btn")
    .addEventListener("click", function () {
      senderID = document.querySelector("#join-id").value;
      if (senderID.length == 0 || !/^[0-9-]+$/.test(senderID)) {
        alert("Invalid Room ID. Please enter a valid Room ID.");
        return;
      }
      let joinID = generateID();

      socket.emit("reciever-join", {
        uid: joinID,
        sender_uid: senderID,
      });

      // Switch to the file sharing screen
      document.querySelector(".peer-join-screen").classList.remove("active");
      document.querySelector(".fileshare-screen").classList.add("active");
    });

  let fileShare = {};
  socket.on("fs-meta", function (metadata) {
    fileShare.metadata = metadata;
    fileShare.transmitted = 0;
    fileShare.buffer = [];

    let el = document.createElement("div");
    el.classList.add("item");
    el.innerHTML = `<div class="progress">0%</div>
          <div class="filename">${metadata.filename}</div>`;
    document.querySelector(".shared-files-list").appendChild(el);
    fileShare.progress_node = el.querySelector(".progress");
    socket.emit("fs-start", {
      uid: senderID,
    });
  });

  socket.on("fs-share", function (buffer) {
    fileShare.buffer.push(buffer);
    fileShare.transmitted += buffer.byteLength;
    fileShare.progress_node.innerText =
      Math.trunc(
        (fileShare.transmitted / fileShare.metadata.total_buffer_size) * 100
      ) + "%";
    if (fileShare.transmitted == fileShare.metadata.total_buffer_size) {
      download(new Blob(fileShare.buffer), fileShare.metadata.filename);
      fileShare = {};
      // Update the UI to indicate file download completion
      document
        .querySelector(".shared-files-list .item .progress")
        .innerText = "Downloaded";
    } else {
      socket.emit("fs-start", {
        uid: senderID,
      });
    }
  });

  socket.on("invalid-room", function () {
    alert("Invalid Room ID. Please enter a valid Room ID. And Refresh");
  });
})();
