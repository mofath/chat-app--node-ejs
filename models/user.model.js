const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: { type: String, default: "default-user-image.png" },
  friends: {
    type: [{ name: String, image: String, id: String, chatId: String }],
    default: [],
  },
  friendRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
  sentRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
  recievedRequest: {
    type: [{ name: String, id: String }],
    default: [],
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // hash the password using our new salt
  bcrypt
    .hash(user.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => {
        if (user) reject("Email already exists");
        else {
          const newUser = new User({ username, email, password });
          newUser.save();
        }
      })
      .then(() => resolve("New user created"))
      .catch((error) => reject(error));
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) reject("Email not found");
        else {
          bcrypt.compare(password, user.password).then((match) => {
            if (!match) reject("Invalid password");
            else resolve(user);
          });
        }
      })
      .catch((error) => reject(error));
  });
};

exports.getUserData = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

exports.sendFriendRequest = async (data) => {
  const { ownerId, ownerName, userId, userName } = data;
  try {
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          sentRequests: {
            id: ownerId,
            name: ownerName,
          },
        },
      }
    );
    await User.updateOne(
      { _id: ownerId },
      {
        $push: {
          friendRequests: { id: userId, name: userName },
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

exports.cancelFriendRequest = async (data) => {
  const { ownerId, userId } = data;
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { sentRequests: { id: ownerId } } }
    );
    await User.updateOne(
      { _id: ownerId },
      { $pull: { friendRequests: { id: userId } } }
    );
  } catch (err) {
    console.log(err.message);
  }
};

exports.acceptFriendRequest = async (data) => {
  const { ownerId, ownerName, userId, userName } = data;
  try {
    await User.updateOne(
      { _id: ownerId },
      {
        $pull: { sentRequests: { id: userId } },
        $push: { friends: { id: userId, name: userName } },
      }
    );
    await User.updateOne(
      { _id: userId },
      {
        $pull: { friendRequests: { id: ownerId } },
        $push: { friends: { id: ownerId, name: ownerName } },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

exports.rejectFriendRequest = async (data) => {
  const { ownerId, userId } = data;
  try {
    await User.updateOne(
      { _id: ownerId },
      { $pull: { sentRequests: { id: userId } } }
    );
    await User.updateOne(
      { _id: userId },
      { $pull: { friendRequests: { id: ownerId } } }
    );
  } catch (err) {
    console.log(err.message);
  }
};

exports.User = User;
