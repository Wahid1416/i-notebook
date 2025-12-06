import { useContext } from "react";
import Notes from './Notes'
import noteContext from "../context/notes/NotesContext";
export default function AllNotes() {

  const context = useContext(noteContext);
  const {notes,deleteNote}=context;
    

  return (
    <div className='d-flex flex-wrap justify-content-between m-3'>
        {notes.map((note)=>{
            return <Notes key={note._id} id={note._id} title={note.title} description={note.description} tag={note.tag} date={note.date} deleteNote={deleteNote} />
        })}
    </div>
  )
}
