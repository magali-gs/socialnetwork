const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

/////////////////////////QUERY for register///////////////////////////
module.exports.addUser = (firstName, lastName, email, password) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password) 
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

/////////////////////////QUERY for login///////////////////////////
module.exports.getUserInfo = (userEmail) => {
    const q = `
        SELECT id, email, password
        FROM users
        WHERE email = $1;
        `;
    const params = [userEmail];
    return db.query(q, params);
};

/////////////////////////QUERY for reset password///////////////////////////
module.exports.getUserEmail = (email) => {
    const q = `
        SELECT email
        FROM users
        WHERE email = $1;
        `;
    const params = [email];
    return db.query(q, params);
};

module.exports.addCode = (email, code) => {
    const q = `
    INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2);
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `
        SELECT *
        FROM reset_codes
        WHERE email = $1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        ORDER BY timestamp DESC
        LIMIT 1;
        `;
    const params = [email];
    return db.query(q, params);
};

module.exports.editPassword = (email, password) => {
    const q = `
        UPDATE users 
        SET password=$2
        WHERE email=$1;
        `;
    const params = [email, password];
    return db.query(q, params);
};

/////////////////////////QUERY for upload picture/////////////////////////
module.exports.getUserProfile = (userId) => {
    const q = `
        SELECT id, first_name, last_name, CONCAT (first_name, ' ', last_name) AS full_name, email, bio, profile_pic
        FROM users
        WHERE id = $1;
        `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.editProfilePic = (userId, url) => {
    const q = `
        UPDATE users 
        SET profile_pic=$2
        WHERE id=$1
        RETURNING profile_pic;
        `;
    const params = [userId, url];
    return db.query(q, params);
};

/////////////////////////QUERY for edit/delete bio///////////////////////////
module.exports.editBio = (userId, bio) => {
    const q = `
        UPDATE users 
        SET bio=$2
        WHERE id=$1;
        `;
    const params = [userId, bio];
    return db.query(q, params);
};

/////////////////////////QUERY find people///////////////////////////
module.exports.getUsers = () => {
    const q = `
        SELECT id,first_name, last_name, CONCAT (first_name, ' ', last_name) AS full_name, bio, profile_pic 
        FROM users
        ORDER BY id DESC
        LIMIT 3;
        `;
    return db.query(q);
};

module.exports.getMatchingPeople = (val) => {
    const q = `
        SELECT id, first_name, last_name, CONCAT (first_name, ' ', last_name) AS full_name, bio, profile_pic 
        FROM users
        WHERE first_name ILIKE $1 OR last_name ILIKE $1
        LIMIT 4;
        `;
    const params = [val + '%'];        
    return db.query(q, params);
};

/////////////////////////QUERY for friendship ///////////////////////////
module.exports.getFriendshipsStatus = (userId, otherUserId) => {
    const q = `
        SELECT * 
        FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.makeRequest = (userId, otherUserId) => {
    const q = `
        INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING sender_id, recipient_id, accepted;
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.cancelRequest = (userId, otherUserId) => {
    const q = `
        DELETE
        FROM friendships 
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.acceptRequest = (userId, otherUserId) => {
    const q = `
        UPDATE friendships
        SET accepted = 'true' 
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

/////////////////////////QUERY for friends ///////////////////////////
module.exports.getFriendsWannabes = (userId) => {
    const q = `
        SELECT users.id, first_name, last_name, CONCAT (first_name, ' ', last_name) AS full_name, profile_pic, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id);
        `;
    const params = [userId];
    return db.query(q, params);
};

/////////////////////////QUERY for chat ///////////////////////////
module.exports.getMostRecentMessages = () => {
    const q = `
        SELECT chat_messages.id, first_name, last_name, CONCAT (first_name, ' ', last_name) AS full_name, profile_pic, user_id, message, 
            TO_CHAR(chat_messages.create_at, 'DD/MM/YYYY, HH12:MI AM') AS create_at
        FROM chat_messages
        JOIN users
        ON chat_messages.user_id = users.id
        ORDER BY chat_messages.create_at
        LIMIT 10;
        `;
    return db.query(q);
};

module.exports.newMessage = (userId, message) => {
    const q = `
        INSERT INTO chat_messages (user_id, message)
        VALUES ($1, $2)
        RETURNING id, create_at, message;
        `;
    const params = [userId, message];
    return db.query(q, params);
};



