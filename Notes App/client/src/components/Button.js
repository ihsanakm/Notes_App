import React from "react";

export default function Button({note, handleDelete, handleUpdate}) {
  return (
    <>
      <button onClick={() => handleDelete(note._id)} type="submit">
        Delete
      </button>
      <button onClick={() => handleUpdate(note)} type="submit">
        Update
      </button>
    </>
  );
}
