const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.get("/", async (request, response) => {
  //const users = await User.find({});
  const users = await User.find({}).populate("notes", { content: 1, date: 1 });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  console.log("Posting to users");
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
