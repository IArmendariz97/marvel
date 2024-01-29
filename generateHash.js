const crypto = require("crypto");

const apiKey = "5574501ea74f5115a40c388f0d5b1b08";
const privateKey = "055fe46d725905cc51054c4247fed19df97a2c35";

function generateHash() {
  const timestamp = Date.now().toString();
  const hash = crypto
    .createHash("md5")
    .update(timestamp + privateKey + apiKey)
    .digest("hex");
  return {
    ts: timestamp,
    hash: hash,
  };
}

const { ts, hash } = generateHash();
console.log("Timestamp:", ts);
console.log("Hash:", hash);
