# Social Network
This social network is a single page application that I built as an assignment in Spiced Academy bootcamp 
and a part of learning React, React Hooks, Redux and Socket.io.

## Table of contents
* [Technologies](#Technologies)
* [Setup](#Setup)
* [Features](#Features)
* [Showroom](#Showroom)
* [To-do]()

## Technologies
Project is created with:
* HTML, SCSS, Node.js / Express, Bundle.js, PostgreSQL, React, React Hooks, Redux
* Socket.io
* Csurf, Cookie Session, Bcrypt

## Setup
Clone this repo to your desktop and run ```npm install``` to install all the dependencies.

## Features
* Registration / Login / Logout
  * Reset password
* Password hashing
* Upload / change avatar
* Create / edit bio
* Find users
  * Show the last 3 registered users OR
  * Search bar for users, list updates on each input
* Other user profile
  * Image, name, bio
  * Add Friend / Accept friendship / Pending friendship / Unfriend button depending on the current status
* Friends and wannabes
  * List of friends
    * Unfriend button - removes from friends list immediately
  * List of pending friendships
    * Accept friendship button - user immediately moved to Friends list
    * Thumbnail is a link to other user's profile
* Chatroom - real-time public chat with anyone registered
  * Delete your own messages
* Delete profile
  * Delete all messages on chatroom
  * Delete all uploaded pictures on AWS - S3 bucket
* Added dummy users and dummy messages into the database for display purposes


## Showroom
### Profile
![](/client/public/profile.gif)

### Finding users
![](/client/public/find-user.gif)

### Send and accept friend request
![](/client/public/friendship-btn.gif)

### Chat
![](/client/public/chat.gif)

## To-do
Next functionalities I want to add:
- [ ] Mobile responsiveness
- [ ] Notification about new messages on chatroom in header
- [ ] Notification when a friend request arrives
- [ ] Private messages with friends
- [ ] Show if a friend is online

