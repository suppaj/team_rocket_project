require("dotenv").config();

// This is the Web Server
const express = require("express");
const server = express();
const cors = require("cors");
const passport = require("passport");
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
// require("./passport");
// create logs for everything
const morgan = require("morgan");

server.use(cors());
server.use(morgan("dev"));

// handle application/json requests
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// ADDITION OF COOKIE SESSION
server.use(
  cookieSession({
    name: "customer-session",
    keys: ["key1", "key2"],
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "622808850843-hm2l64kf77vq0ggcm4ll4gi193sagbt5.apps.googleusercontent.com",
      clientSecret: "UQjGHrYK_9dv99ZtlqkDDRAb",
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

server.use(passport.initialize());
server.use(passport.session());

server.get(
  "/auth/google",

  () => {
    console.log("hi im in psp");
    passport.authenticate("google", {
      scope: ["profile", "email"],
    });
  }
);

server.get(
  "/auth/google/callback",

  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./routes"));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
