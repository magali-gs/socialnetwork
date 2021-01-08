const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require( "./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("./secrets.json"));

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
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


// redirect stuff... after set the cookie session middleware
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
    //they shouldn't be allowed to see /welcome
        res.redirect("/");
    } else {
    //the user is allowed to see the welcome page
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    const { first, last, email, password} = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw)
                .then(({ rows }) => {
                    console.log("addUser worked: ", rows);
                    req.session.userId = rows[0].id;
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

app.post("/welcome/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    db.getUserInfo(email)
        .then(({ rows }) => {
            console.log("rows", rows);
            if (rows.length > 0) {
                compare(password, rows[0].password)
                    .then((result) => {
                        console.log("deu certo", result);
                        if (result) {
                            req.session.userId = rows[0].id;
                            res.json({ error: false });
                        } else {
                            console.log("senha nao compativel");
                            res.json({ error: true });
                        }
                    }).catch((error) => {
                        console.log("error in compare password", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        }).catch((error) => {
            console.log("error in getUserInfo", error);
            res.json({ error: true });
        });
});

app.post("/welcome/reset-password/start", (req, res) => {
    const { email } = req.body;
    db.getUserEmail(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(email, secretCode)
                    .then(() => {
                        //send the email
                        var subj = "Social Network Password Reset";
                        var msg = 
`Greetings from Social Network,

To reset your password for Social Network, please enter the followingcode and the new password in the reset password page.
    ${secretCode}

If you don't want to reset your password, you can ignore this message - someone probably typed in your username or email address by mistake.
                        
Thanks! 
Team Social Network`;
                        sendEmail(email, msg, subj)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((error) => {
                                console.log("error in sendEmail", error);
                                res.json({ error: true });
                            });
                    })
                    .catch((error) => {
                        console.log("error in addCode", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getUserEmail", error);
            res.json({ error: true });
        });
});

app.post("/welcome/reset-password/verify", (req, res) => {
    console.log(req.body);
    const { email, resetCode, password } = req.body;
    db.getCode(email)
        .then(({ rows }) => {
            console.log(rows);
            if (resetCode === rows[0].code) {
                console.log('alterar senha');
                hash(password)
                    .then((hashedPw) => {
                        db.editPassword(email, hashedPw)
                            .then(({rows}) => {
                                console.log("editPassword worked", rows);
                                res.json({ success: true });
                            }).catch((error) => {
                                console.log('error in editPassword', error);
                                res.json({ error: true });
                            });
                    });
            } else {
                console.log('code doesnt match');
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log('error in getCode: ', error);
            res.json({ error: true });
        });
});

app.get('/profile.json', (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        }).catch((error) => {
            console.log("error in /profile route - getUserProfile", error);
            res.json({ error: true });
        });
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    if (req.file) {
        const url = `${s3Url}${req.file.filename}`;
        db.editProfilePic(req.session.userId, url)
            .then(() => {
                res.json({ sucess: true, url: url });
            })
            .catch((error) => {
                console.log("Error in editProfilePic: ", error);
                res.json({ error: true });
            });
    } else {
        res.json({ error: true });
    }
});

app.post(("/edit-bio"), (req, res) => {
    console.log("POST request in /edit-bio route", req.body);
    const { draftBio } = req.body;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

app.post("/delete-bio", (req, res) => {
    console.log("POST request in /edit-bio route", req.body);
    const draftBio = null;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio,
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

app.post("/delete-profile-pic", s3.delete, (req, res) => {
    console.log("POST request in /delete-profile-pic route", req.body);
    const newUrl = null;
    db.editProfilePic(req.session.userId, newUrl)
        .then(() => {
            res.json({ sucess: true, url: newUrl });
        })
        .catch((error) => {
            console.log("Error in delete-profile-pic: ", error);
            res.json({ error: true });
        });

});

app.get("/member/:id", (req, res) => {
    const { id } = req.params;
    db.getUserProfile(id)
        .then(({ rows }) => {
            rows[0]["loggedId"] = req.session.userId;
            res.json(rows[0]);
        })
        .catch((error) => {
            console.log("getUserProfile error ", error);
            res.json({ error: true });
        });
});

//ALWAYS AT THE END BEFORE THE app.listen
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
