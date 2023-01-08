import fs from "node:fs";
import dotenv from "dotenv";
import sshpkg from "ssh2";

dotenv.config();

if (!process.env.SSH_KEYPATH) {
    console.error("need to set env var: SSH_KEYPATH");
    console.error("either use .env file or set env var directly");
    process.exit(1);
}

const key = fs.readFileSync(process.env.SSH_KEYPATH).toString();
const utils = sshpkg.utils;
const client = sshpkg.Client;
const conn = new client();

conn.on("ready", () => {
    console.log("Client :: ready");
    conn.exec("uptime", (err, stream) => {
        if (err) throw err;
        stream
            .on("close", (code: string, signal: string) => {
                console.log("Stream :: close :: code: " + code + ", signal: " + signal);
                conn.end();
            })
            .on("data", (data: string) => {
                console.log("STDOUT: " + data);
            })
            .stderr.on("data", (data) => {
                console.log("STDERR: " + data);
            });
    });
});

conn.connect({
    host: process.env.SSH_HOST,
    port: 22,
    username: process.env.SSH_USER,
    privateKey: key,
    debug: (s) => {
        console.log(s);
    },
});
