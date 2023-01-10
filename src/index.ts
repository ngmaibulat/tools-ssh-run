import con from "./connection.js";
import { deployK3S } from "./lib/install.js";
import { shell } from "./lib/utils.js";

// await con.mkdir("hello");
// await deployK3S(con);

await shell(con, process.stdin, process.stdout);
