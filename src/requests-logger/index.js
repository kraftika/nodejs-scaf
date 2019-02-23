const { randomRow } = require("./generate-log");

console.log(randomRow());

let fs = require("fs"),
  readline = require("readline");

function parseLogFile() {
  const label = "requests_log_00.txt";

  const file = __dirname + "/" + label;

  let rl = readline.createInterface({
    input: fs.createReadStream(file)
  });

  let requests = [];

  rl.on("line", line => {
    let parsedLine = line.split(" ");
    let hostname = parsedLine[0];
    let timeStamp = parsedLine[3].split(" ")[0].replace("[", "");

    const req = requests.find(r => r[hostname] && r[hostname][timeStamp]);
    if (!req) {
      const req = {
        [hostname]: {
          [timeStamp]: 1
        }
      };

      requests = [...requests, req];
    } else {
      req[hostname][timeStamp] += 1;
    }
  });

  rl.on("close", () => {
    let writeStream = fs.createWriteStream(__dirname + "/req_" + label, {
      flags: "a"
    });

    let counter = 0;
    requests.forEach(req =>
      Object.keys(req).map(keyHost =>
        Object.keys(req[keyHost]).map(keyTS => {
          if (req[keyHost][keyTS] > 1) {
            counter++;
            const line =
              counter.toString() +
              ". " +
              keyTS +
              " " +
              req[keyHost][keyTS] +
              " times. \r\n";
            writeStream.write(line);
          }
        })
      )
    );
  });
}

parseLogFile();

function readWithStream() {
  const label = "/requests_log_00.txt";
  const file = __dirname + label;
  console.time(label);

  const stream = fs.createReadStream(file, { encoding: "utf8" });
  stream
    .on("data", data => {
      console.log(data);
    })
    .on("close", () => {
      console.timeEnd(label);
    });
}

function readFromCLI() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(`Your name?`, name => {
    console.log(`Hi ${name}`);
    readline.close();
  });
}
