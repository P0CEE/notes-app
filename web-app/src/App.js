import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

import "./App.css";
import Note from "./components/Note";
import DarkMode from "./components/DarkMode";

function App() {
  return (
    <div>
      <Toaster richColors position="top-center"/>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

function Main() {
  const [notes, setNotes] = React.useState(null);
  const [selectedNoteId, setSelectedNoteId] = React.useState(null);
  const navigate = useNavigate();

  async function fetchNotes() {
    try {
      const response = await fetch("/notes?_sort=id&_order=desc");
      if (!response.ok) {
        throw new Error(`Error fetching notes. Status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  }

  async function createNote() {
    const response = await fetch("/notes", {
      method: "POST",
      body: JSON.stringify({ title: "Nouvelle note", content: "" }),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const newNote = await response.json();
      fetchNotes();

      toast.success("Nouvelle note créée avec succès");

      // Rediriger vers la note nouvellement créée
      navigate(`/notes/${newNote.id}`);
    } else {
      toast.error("Erreur lors de la création de la note");
    }
  }

  React.useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <aside className="Side">
        <div>
          <button className="Button Button-create-note" onClick={createNote}>
            +
          </button>
          {notes !== null ? (
            <ol className="Notes-list">
              {notes.map((note) => (
                <li key={note.id}>
                  <Link
                    className={`Note-link ${note.id === selectedNoteId ? 'selected' : ''}`}
                    to={`/notes/${note.id}`}
                    onClick={() => setSelectedNoteId(note.id)}
                  >
                    {note.title}
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        <DarkMode />
      </aside>
      <main className="Main">
        <Routes>
          <Route path="/" element="Sélectionner une note" />
          <Route
            path="/notes/:id"
            element={<Note onSaveSuccess={fetchNotes} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;