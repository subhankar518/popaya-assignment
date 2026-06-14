import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TypeSelector from "../components/TypeSelector";
import { getSingleNote, updateNote } from "../api/notesApi";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("Generic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await getSingleNote(id);

        setTitle(res.data.data.title);
        setContent(res.data.data.content);
        setType(res.data.data.type);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert("Title is required");
    }

    try {
      await updateNote(id, {
        title,
        content,
        type,
      });

      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="form-container">
      <h2>Edit Note</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TypeSelector selectedType={type} setSelectedType={setType} />

        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}

export default EditNote;
