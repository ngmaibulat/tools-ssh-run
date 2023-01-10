import { NodeSSH } from "node-ssh";
import { allowTcpPort, setFilePermissions, serviceStatus, fileReplace } from "./utils.js";

export async function installK3S(con: NodeSSH) {
    let cmd = "curl -sfL https://get.k3s.io | sh - ";
    let res = await con.execCommand(cmd);
    return res;
}

export async function deployK3S(con: NodeSSH) {
    console.log(await installK3S(con));
    console.log(await allowTcpPort(con, 6444));
    console.log(await setFilePermissions(con, "/etc/rancher/k3s/k3s.yaml", 555));
    console.log(await serviceStatus(con, "k3s"));

    //copy config
    const fname = `k3s-${process.env.SSH_HOST}.yaml`;
    await con.getFile(fname, "/etc/rancher/k3s/k3s.yaml");

    // update ip in yaml
    const url = `https://${process.env.SSH_HOST}:6443`;
    await fileReplace(fname, "https://127.0.0.1:6443", url);

    const help = `
# see yaml file in access folder
# setup kubectl as follows:
export KUBECONFIG=/path/to/k3s.yaml
kubectl cluster-info
`;

    console.log(help);
}
