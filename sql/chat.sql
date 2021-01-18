DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    message VARCHAR(255) NOT NULL CHECK (message != ''),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat_messages (message, user_id) 
VALUES ('dummy message 1...', 15);
INSERT INTO chat_messages (message, user_id) 
VALUES ('dummy message 2...', 15);
INSERT INTO chat_messages (message, user_id) 
VALUES ('dummy message 3...', 15);

SELECT users.id, first_name, last_name, profile_pic, user_id, message, chat_messages.create_at
FROM chat_messages
JOIN users
ON chat_messages.user_id = users.id; 