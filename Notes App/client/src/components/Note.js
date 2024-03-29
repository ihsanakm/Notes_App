import React, {   useState } from "react";
import axios from "axios";
import NoteItem from "./NoteItem";
import Button from "./Button";
import NoteForms from "./NoteForms";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { userLoggedOut } from "./redux/userAction";

function Note() {

  const navigate = useNavigate();
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
  });
  const [notes, setNotes] = useState([]);
  const [updateNote, setUpdateNote] = useState({
    id: null,
    title: "",
    body: "",
  });


    // Fetch data only when logged in
    // if (auth.isAuthenticated()) {
    //   console.log(auth.isAuthenticated())
  //[auth.isAuthenticated]); // Add isAuthenticated as a dependency

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/note", { withCredentials: true });
      setNotes(res.data.note);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  fetchNotes();

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/note", newNote, { withCredentials: true });
      setNotes([...notes, res.data.Note]);
      setNewNote({
        title: "",
        body: "",
      });
      console.log(res.data.note);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setNotes(
        [...notes].filter((note) => {
          return note._id !== id;
        })
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdate = (note) => {
    setUpdateNote({
      id: note._id,
      title: note.title,
      body: note.body,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/update/${updateNote.id}`, {
        title: updateNote.title,
        body: updateNote.body,
      }, { withCredentials: true });
      setUpdateNote({
        id: null,
        title: "",
        body: "",
      });
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUpdateNote({
      ...updateNote,
      [name]: value,
    });
  };

  const handleLogout = async () => {
    try{
      await axios.get("/logout",{withCredentials:true})
      dispatch(userLoggedOut())
      navigate('/login'); 
    }catch (err){
    console.log(err)
    }
  }

  return (
    <>
      {user && (
        <div>
          {notes.map((note) => (
            <React.Fragment key={note._id}>
              <NoteItem note={note} />
              <Button
                note={note}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </React.Fragment>
          ))}
        </div>
      )}
  
      {user && (
        <div>
          <NoteForms
            newNote={newNote}
            updateNote={updateNote}
            handleUpdateChange={handleUpdateChange}
            handleUpdateSubmit={handleUpdateSubmit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <button onClick={handleLogout}>log out</button>
        </div>
      )}
    </>
  );
    }

export default Note;