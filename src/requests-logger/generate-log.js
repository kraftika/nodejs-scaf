const hello = () => console.log("hello");

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * Math.floor(122 - 97) + 97));

const randomHostname = () => {
  let hostnameString = "";
  for (let i = 0; i < 8; i++) {
    hostnameString += randomChar();
  }

  let suffix = ["org", "com", "gov", "eu"][
    Math.floor(Math.random() * Math.floor(3))
  ];

  return `www.${hostnameString}.${suffix}`;
};

const randomTimeStamp = () => {
  return 12;
};

const dash = () => " - ";

const randomRow = stream => {
  const hostname = randomHostname();

  const line = [randomHostname, dash, dash, randomTimeStamp].reduce(
    (acc, fn) => (acc += fn()),
    ""
  );

  return line;
};

module.exports = { randomRow };
