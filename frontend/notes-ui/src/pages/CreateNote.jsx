import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createNote } from "../api/notesApi";

function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert("Title is required");
    }

    await createNote({
      title,
      content,
    });

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Create Note</h2>

      <form onSubmit={submitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}

export default CreateNote;
