const Note = require("../model/note");

const getNotes = async (req, res) => {
  const notes = await Note.find();

  res.json({ note: notes });
};

const getNote = async (req, res) => {
  let id = req.params.id;

  let note = await Note.findById(id);

  res.json({ note: note });
};

const createNote = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const note = await Note.create({
    title: title,
    body: body,
  });
  res.json({ Note: note });
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;

  await Note.findByIdAndUpdate(id, { title: title, body: body });

  let note = await Note.findById(id);

  res.json({ Note: note });
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  await Note.findOneAndDelete(id);
  res.json({ Message: "Successfully Deleted" });
};

module.exports = {
  getNotes: getNotes,
  getNote: getNote,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
