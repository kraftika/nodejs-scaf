const hello = () => console.log("hello");

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * Math.floor(122 - 97) + 97));

  module.exports = { randomChar };
