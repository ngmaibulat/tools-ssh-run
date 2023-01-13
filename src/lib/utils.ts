import fs from "node:fs/promises";
import { NodeSSH } from "node-ssh";

// sudo ufw allow 6443/tcp

export async function allowTcpPort(con: NodeSSH, port: number) {
    let cmd = `sudo ufw allow ${port}/tcp`;
    return await con.execCommand(cmd);
}

export async function setFilePermissions(con: NodeSSH, path: string, mode: number) {
    // sudo chmod 555 /etc/rancher/k3s/k3s.yaml
    let cmd = `sudo chmod ${mode} ${path}`;
    return await con.execCommand(cmd);
}

export async function serviceStatus(con: NodeSSH, service: string) {
    // sudo systemctl status k3s
    let cmd = `sudo systemctl status ${service}`;
    return await con.execCommand(cmd);
}

export async function fileReplace(path: string, search: string, replace: string) {
    const buf = await fs.readFile(path);
    const str = buf.toString();
    const res = str.replace(search, replace);
    return await fs.writeFile(path, res);
}

export async function shell(con: NodeSSH, inp: NodeJS.ReadStream, out: NodeJS.WriteStream) {
    const shell = await con.requestShell();

    shell.pipe(out);
    inp.pipe(shell);

    shell.on("exit", () => {
        con.dispose();
    });
}
