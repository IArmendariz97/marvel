const crypto = require("crypto");

const apiKey = "9386b7e8b2a423e7daa017a43a0421d9";
const privateKey = "7763a538b56ed3731f3ced1ffe0873a1d2c6a7cd";

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
