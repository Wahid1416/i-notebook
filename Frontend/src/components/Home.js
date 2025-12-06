import { useContext } from "react";
import AllNotes from './AllNotes'
import noteContext from "../context/notes/NotesContext";

export default function Home() {
  const context = useContext(noteContext);

  return (
    <div style={{minHeight:"100vh" , background: context.theme === "Dark" ? "black" : "" , color: context.theme === "Dark" ? "white" : ""}} data-bs-theme={context.theme === "Dark" ? "dark" : "light"}>
    <div data-bs-theme={context.theme === "Dark" ? "dark" : "light"} className="container py-3 ">
      <h1 className='m-3'>Welcome to i-Notebook</h1>
      <AllNotes />
    </div>
    </div>
  )
}
