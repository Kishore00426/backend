// const express = require("express");  // import express
// const app = express();               // create an express app

// // GET route for navigation (homepage)
// app.get("/", (req, res) => {
//   res.send("Hello from Express homepage!");
// });
// // for about page 
// app.get("/about", (req, res) => {
//   res.send("welcome to about page!!!");
// });
// // for contact page
// app.get("/contact", (req, res) => {
//   res.send("welcome to contact page!!!");
// });

// //if it is a user page 
// app.get("/user", (req, res) => {
//   res.json({
//     name: "KK",
//     age: 22,
//     city: "Chennai"
//   });
// });

// //simple middleware
// app.use(express.json());

// //post method for handling input data
// app.post("/add", (req, res) => {
//   const data = req.body;
//   console.log(data);
//   res.send("Data received!");
// });

// // To Run the server
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

//middleware
const express = require("express");
const app = express();

// Middleware function
app.use((req, res, next) => {
  console.log("Middleware ran!");
  next(); // moves to the next step (next middleware or route)
});

// Route
app.get("/", (req, res) => {
  res.send("Hello from home!");
});

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000);
console.log("Server running on http://localhost:3000");


//middleware examples using logging time 
function logTime(req, res, next) {
  console.log("Time:", new Date().toISOString());
  next();
}

function verifyUser(req, res, next) {
  console.log(" User verified!");
  next();
}

app.get("/profile", logTime, verifyUser, (req, res) => {
  res.send(" User Profile Page");
});
