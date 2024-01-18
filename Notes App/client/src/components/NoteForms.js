import React from "react";
import NoteForm from "../components/SingleNoteForm";

function NoteForms({
  updateNote,
  newNote,
  handleUpdateChange,
  handleUpdateSubmit,
  handleChange,
  handleSubmit,
}) {
  return (
    <>
      {updateNote.id ? (
        <NoteForm
          title={updateNote.title}
          body={updateNote.body}
          handleChange={handleUpdateChange}
          handleSubmit={handleUpdateSubmit}
          buttonText="Update"
        />
      ) : (
          <NoteForm
            title={newNote.title}
            body={newNote.body}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Create"
          />
      )}
    </>
  );
    
}

export default NoteForms;
