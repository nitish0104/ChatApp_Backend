const express = require("express");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controller/chatControllers");
const auth = require('../middleware/auth')
const chatRouter = express.Router()


chatRouter
	.route("/")
	.post(auth, accessChat)

chatRouter.route("/").get(auth, fetchChats);
chatRouter.route("/group").post(auth, createGroupChat);
chatRouter.route("/rename").put(auth, renameGroup);
chatRouter.route("/groupremove").put(auth, removeFromGroup);
chatRouter.route("/groupadd").put(auth, addToGroup);

module.exports = chatRouter;