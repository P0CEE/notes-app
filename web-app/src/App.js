import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

import "./App.css";
import Note from "./components/Note";

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
  const navigate = useNavigate();

  async function fetchNotes() {
    const response = await fetch("/notes?_sort=id&_order=desc");
    const data = await response.json();
    setNotes(data);
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
                  <Link className="Note-link" to={`/notes/${note.id}`}>
                    {note.title}
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </aside>
      <main className="Main">
        <Routes>
          <Route path="/" element="Sélectionner une note" />
          <Route
            path="/notes/:id"
            element={<Note onSaveSuccess={fetchNotes} />}
          />

          {/* Ajoutez d'autres routes au besoin */}
        </Routes>
      </main>
    </div>
  );
}

export default App;