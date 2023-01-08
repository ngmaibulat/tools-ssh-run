import { NodeSSH } from "node-ssh";

export async function installK3S(con: NodeSSH) {
    let cmd = "curl -sfL https://get.k3s.io | sh - ";
    let res = await con.execCommand(cmd);
    return res;
}
