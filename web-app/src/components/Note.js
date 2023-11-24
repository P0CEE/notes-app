import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Note.css";

function Note() {
  const { id } = useParams();


  return (
    <form className="Form">
      <input className="Note-editable Note-title" type="text" value={note.title} />

      <textarea className="Note-editable Note-content" value={note.content} />

      <div className="Note-actions">
        <button className="Button">Enregistrer</button>
      </div>
    </form>
  );
}

export default Note;
