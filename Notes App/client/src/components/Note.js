
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NoteItem from "./NoteItem";
import Button from "./Button";
import NoteForms from "./NoteForms";
import { authContext } from "./RequireAuth";


function Note() {

  const {logedIn}=useContext(authContext)


  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
  });

  const [notes, setNotes] = useState([]);

  //useEffect
  useEffect(() => {
    fetchNotes();
  }, []);

  //update notes
  const [updateNote, setUpdateNote] = useState({
    id: null,
    title: "",
    body: "",
  });

  const fetchNotes = async () => {
    const res = await axios.get("/note");
    setNotes(res.data.note);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/note", newNote);

    setNotes([...notes, res.data.Note]);
    setNewNote({
      title: "",
      body: "",
    });
    console.log(res.data.note);
  };

  const handleDelete = async (id) => {
    //delete note
    const res = await axios.delete(`/delete/${id}`);

    //update notes
    setNotes(
      [...notes].filter((note) => {
        return note._id !== id;
      })
    );
    //or we can use fetchNotes();
  };

  const handleUpdate = (note) => {
    //update note fields
    setUpdateNote({
      id: note._id,
      title: note.title,
      body: note.body,
    });
  };

  // update form handleing
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/update/${updateNote.id}`, {
      title: updateNote.title,
      body: updateNote.body,
    });
    setUpdateNote({
      id: null,
      title: "",
      body: "",
    });

    //update notes
    fetchNotes();
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUpdateNote({
      ...updateNote,
      [name]: value,
    });
  };

  return (
    logedIn ? ( <div>
      {notes.map((note) => (
        <>
          <NoteItem note={note} />
          <Button
            note={note}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </>
      ))}
      <NoteForms
        newNote={newNote}
        updateNote={updateNote}
        handleUpdateChange={handleUpdateChange}
        handleUpdateSubmit={handleUpdateSubmit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
   ) : ""
  );
}

export default Note;
