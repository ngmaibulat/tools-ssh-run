import con from "./connection.js";

await con.mkdir("hello");
let res = await con.execCommand("ls -la");
console.log(res);

let cmd = "curl -sfL https://get.k3s.io | sh - ";
res = await con.execCommand(cmd);
console.log(res);

con.dispose();
