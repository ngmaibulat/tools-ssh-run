import con from "./connection.js";
import { installK3S } from "./install.js";

// await con.mkdir("hello");
// let res = await con.execCommand("ls -la");
// console.log(res);

console.log(await installK3S(con));

con.dispose();
