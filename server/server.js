const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("../db");
const { hash, compare } = require("../bc");

app.use(
    express.json({
        extended: false,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


// redirect stuff... after set the cookie session middleware
app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
        //they shouldn't be allowed to see /welcome
    //     res.redirect("/");
    // } else {
        //the user is allowed to see the welcome page
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

app.post("/registration", (req, res) => {
    const { first, last, email, password} = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw).then(({ rows }) => {
                console.log("addUser worked: ", rows);
            }).catch((error) => {
                console.log("error in addUser: ", error);
            });
    });
});

//ALWAYS AT THE END BEFORE THE app.listen
app.get("*", function (req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
