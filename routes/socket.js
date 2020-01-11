const server = require("../server");
const socket = require("socket.io");

let io = socket(server);

io.on("connection", socket => {
  console.log("connected whoooooooooohooooooo");
});
