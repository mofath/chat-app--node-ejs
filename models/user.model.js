const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: "default-user-image.png" },
    friends: {
        type: [{ name: String, image: String, id: String, chatId: String }],
        default: []
    },
    friendRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    sentRequests: {
        type: [{ name: String, id: String }],
        default: []
    }
});

const User = mongoose.model("user", userSchema);
exports.User = User;