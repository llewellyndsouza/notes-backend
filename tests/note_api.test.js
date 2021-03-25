const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

// Before testing
const Note = require("../models/note");
const initialNotes = [
  { content: "HTML is easy", date: new Date(), important: false },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

// Testing
test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  expect(response.body[0].content).toBe("HTML is Easy");
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

// After testing
afterAll(() => {
  mongoose.connection.close();
});
