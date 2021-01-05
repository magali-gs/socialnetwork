const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("../db");
const { hash, compare } = require("../bc");
const csurf = require("csurf");

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("../secrets.json"));

app.use(
    express.json({
        extended: false,
    })
);

app.use(
    cookieSession({
        secret: `${secret}`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    console.log("token", req.csrfToken);
    res.cookie("mytoken", req.csrfToken());
    next();
});

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
            db.addUser(first, last, email, hashedPw)
                .then(({ rows }) => {
                    console.log("addUser worked: ", rows);
                    // req.session.userId = rows[0].id;
                    res.json({ error: false });
                })
                .catch((error) => {
                    console.log("error in addUser: ", error);
                    res.json({ error: true });
                });
        })
        .catch((error) => {
            console.log("error in hash: ", error);
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
