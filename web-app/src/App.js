import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote } from './api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const sortedNotes = await fetchNotes();
        setNotes(sortedNotes);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes', error);
      }
    };

    fetchNotesData();
  }, []);

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote();
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    } catch (error) {
      console.error('Erreur lors de la création de la note', error);
    }
  };

  return (
    <>
      <aside className="Side">
        <div>
          <button className="Button-create-note" onClick={handleCreateNote}>
            +
          </button>
        </div>
        {notes.map((note) => (
          <div key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <p>Créé le {new Date(note.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </aside>
      <main className="Main"></main>
    </>
  );
}

export default App;
