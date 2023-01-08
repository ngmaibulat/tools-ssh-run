import con from "./connection.js";
import { installK3S } from "./lib/install.js";
import { allowTcpPort, setFilePermissions, serviceStatus } from "./lib/utils.js";

// await con.mkdir("hello");
// let res = await con.execCommand("ls -la");
// console.log(res);

// console.log(await installK3S(con));
console.log(await allowTcpPort(con, 6444));
console.log(await setFilePermissions(con, "/etc/rancher/k3s/k3s.yaml", 555));
console.log(await serviceStatus(con, "k3s"));

//copy config
await con.getFile("access/k3s.yaml", "/etc/rancher/k3s/k3s.yaml");

// #update ip in permissions
// update ip in yaml

const help = `
# see yaml file in access folder
# setup kubectl as follows:
export KUBECONFIG=/path/to/k3s.yaml
kubectl cluster-info
`;

console.log(help);

con.dispose();
