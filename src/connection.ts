import fs from "node:fs";
import dotenv from "dotenv";
import { NodeSSH } from "node-ssh";

dotenv.config();

if (!process.env.SSH_KEYPATH) {
    console.error("need to set env var: SSH_KEYPATH");
    console.error("either use .env file or set env var directly");
    process.exit(1);
}

const key = fs.readFileSync(process.env.SSH_KEYPATH).toString();

const ssh = new NodeSSH();

const connection = await ssh.connect({
    host: process.env.SSH_HOST,
    username: process.env.SSH_USER,
    privateKey: key,
});

export default connection;
