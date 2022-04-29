const socket = io("http://localhost:7000");

const appendFun = (message, position) => {
  const pTag = document.createElement("p");
  pTag.innerText = message;
  pTag.style = "clear: both; background-color: white; padding: 0px 10px; border-radius: 20px; margin: 2px; font-size: 1.6em;";
  if (position === "left") {
    pTag.style.float = 'left'
  } else {
    pTag.style.float = 'right'
  }
  document.querySelector(".container").append(pTag);
};

const userName = prompt("join room with your name:");
socket.emit("newUserJoined", userName);

socket.on("userJoined", (userName) => {
  appendFun(`${userName} joined the chat`, "left");
});

const formTag = document.getElementById("formTag");
formTag.addEventListener("submit", (event) => {
  event.preventDefault();
  const inpMsg = document.getElementById("msgInp");
  appendFun(`You: ${inpMsg.value}`, "right");
  socket.emit("send", inpMsg.value);
  inpMsg.value = "";
});

socket.on("receive", (data) => {
  appendFun(`${data.userName}: ${data.message}`, "left");
});

socket.on("leave", (userName) => {
  appendFun(`${userName} left the chat`, "left");
});


