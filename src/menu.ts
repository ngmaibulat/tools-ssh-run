import inquirer from "inquirer";
import con from "./connection.js";

const commands = ["ping -c 4 8.8.8.8", "host google.com", "uptime", "free -h", "quit"];

async function run(commands: string[]) {
    const ans = await inquirer.prompt([
        {
            type: "list",
            name: "cmd",
            message: "SSH Destinations",
            choices: commands,
        },
    ]);

    console.log(ans.cmd);

    if (ans.cmd == "quit") {
        con.dispose();
        process.exit(0);
    }

    const out = await con.execCommand(ans.cmd);

    console.log(out.stdout);
}

while (true) {
    await run(commands);
}
