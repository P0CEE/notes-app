import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Note.css";

function Note({ onSaveSuccess }) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/notes/${id}`);
      const data = await response.json();
      setNote(data);
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    if (unsavedChanges) {
      const saveNoteAutomatically = async () => {
        if (note) {
          await fetch(`/notes/${id}`, {
            method: "PUT",
            body: JSON.stringify(note),
            headers: { "Content-Type": "application/json" },
          });
          onSaveSuccess();
        }
      };

      const saveNoteTimeout = setTimeout(() => {
        saveNoteAutomatically();
        setUnsavedChanges(false);
      }, 1000); // Ajustez la durée du délai selon vos besoins

      return () => clearTimeout(saveNoteTimeout);
    }
  }, [unsavedChanges, note, id, onSaveSuccess]);

  const handleTitleChange = (event) => {
    setNote({ ...note, title: event.target.value });
    setUnsavedChanges(true);
  };

  const handleContentChange = (event) => {
    setNote({ ...note, content: event.target.value });
    setUnsavedChanges(true);
  };

  if (!note) {
    return "Chargement…";
  }

  return (
    <form className="Form">
      <input
        className="Note-editable Note-title"
        type="text"
        value={note.title}
        onChange={handleTitleChange}
      />
      <textarea
        className="Note-editable Note-content"
        value={note.content}
        onChange={handleContentChange}
      />
    </form>
  );
}

export default Note;
