import fs from "node:fs";
import dotenv from "dotenv";
import sshpkg from "ssh2";

// const { Client, utils } = sshpkg;

const utils = sshpkg.utils;

dotenv.config();

if (!process.env.SSH_KEYPATH) {
    console.error("need to set env var: SSH_KEYPATH");
    console.error("either use .env file or set env var directly");
    process.exit(1);
}

const key = fs.readFileSync(process.env.SSH_KEYPATH).toString();

const result = utils.parseKey(key);

console.log(result);
