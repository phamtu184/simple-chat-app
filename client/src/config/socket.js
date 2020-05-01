import io from "socket.io-client";
import url from "./url";

let socket = io(`${url.LOCAL}/`, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

export default socket;
