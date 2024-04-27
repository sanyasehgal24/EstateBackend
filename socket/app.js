import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://662cc5e51f56e9a15ce3c85b--incomparable-squirrel-2ecc96.netlify.app/",
  },
});


let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(socket); 
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// io.listen("4000");
io.listen("https://662cc5e51f56e9a15ce3c85b--incomparable-squirrel-2ecc96.netlify.app");
