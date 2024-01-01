// NoteForm.js
import React from "react";

function NoteForm({
  title,
  body,
  handleChange,
  handleSubmit,
  buttonText,
}) {
  return (
    <div>
      <h1>{buttonText} Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={title}
          name="title"
          placeholder="Title"
        ></input>
        <textarea
          onChange={handleChange}
          value={body}
          name="body"
          placeholder="Body"
        ></textarea>
        <button type="submit">{buttonText} Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
