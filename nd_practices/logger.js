// console.log("Backend is running...");

// const fs =require('fs');
// //  reading a file synchronously
// const rc= fs.readFileSync('./files/input.txt' ,'utf-8');
// console.log(rc);

// // writing a file synchronously

// const content= rc +`\n\n this is the appended content`;
// fs.writeFileSync('./files/output.txt','utf-8',content);
// console.log(content);


// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

// app.listen(3000, () => console.log("Server running on port 3000"));

// simple logger function
const fs = require("fs");
const path = require("path");

function logMessage(message) {
  const filePath = path.join(__dirname, "logs.txt");
  const log = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFile(filePath, log, (err) => {
    if (err) console.log(err);
    else console.log("Logged:", message);
  });
}

module.exports = logMessage;



