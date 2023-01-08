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
