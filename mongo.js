const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const databaseName = "note-app";

const url = `mongodb+srv://fullstack:${password}@cluster0.6lwfc.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// // To add a note
// const note = new Note({
//   content: "Mongo takes a while",
//   date: new Date(),
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!", result);
//   mongoose.connection.close();
// });

// To retrieve all notes
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
