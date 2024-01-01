import React from "react";

function NoteItem({note}) {
  return (
    <>
    <div key={note._id}>
    <h2>{note.title}</h2>
    <p>{note.body}</p>
    </div>
    </>
  );
}

export default NoteItem;
