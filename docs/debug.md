- https://github.com/mscdex/ssh2/issues/989

```bash
sudo journalctl -t sshd --follow

Jan 08 10:40:03 dev sshd[13037]: userauth_pubkey: key type ssh-rsa not in PubkeyAcceptedAlgorithms [preauth]
```
