import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NotesContext";

export default function Notes(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);

  return (
    <div className="card my-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p
          className="card-text"
          style={{ height: " 4rem", overflow: "scroll" }}
        >
          {props.description.split(" ").slice(0, 20).join(" ") + "..."}
        </p>
        <p className="card-text">
          <small className="text-muted">{props.date}</small>
        </p>
        <div className="d-flex flex-row-reverse p-2 gap-3">
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              props.deleteNote(props.id);
              context.handleAlert("Note Deleted Sucessfully...", "danger");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => navigate(`/edit-note/${props.id}`)}
          ></i>
        </div>
      </div>
    </div>
  );
}
