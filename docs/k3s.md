### Manual Deployment of K3S

```bash
#allow firewall port
sudo ufw allow 6443/tcp

#install
curl -sfL https://get.k3s.io | sh -

#set config permissions
sudo chmod 555 /etc/rancher/k3s/k3s.yaml

#check service
sudo systemctl status k3s

#copy config
scp k3

#update ip in permissions
update ip in yaml

#set env var
export KUBECONFIG=`pwd`/k3s.yaml

#test connection
kubectl cluster-info
```
