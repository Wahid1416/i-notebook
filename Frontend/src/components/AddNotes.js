import { useState, useContext } from "react";
import noteContext from "../context/notes/NotesContext";
import {  useNavigate } from "react-router-dom";

export default function AddNotes() {
  const navigate = useNavigate();
  const context = useContext(noteContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "-20px",
        paddingTop: "40px",
        background: context.theme === "Dark" ? "black" : "",
        color: context.theme === "Dark" ? "white" : "",
      }}
      data-bs-theme={context.theme === "Dark" ? "dark" : "light"}
    >
      <div className="container my-3">
        <h2>ADD NOTES</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              minLength={5}
              required
              // aria-describedby="emailHelp"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleInputPassword1"
              minLength={5}
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          {/* <ul className="nav-item dropdown" style={{paddingLeft:"0"}}>
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </ul> */}
          <div
            type="submit"
            className="btn btn-primary disable"
            onClick={async () => {
              if (description.length < 5){
                context.handleAlert("Note Added Description length less than 5...", "danger");
              }
              else if (title.length < 5){
                context.handleAlert("Note Added title length less than 5...", "danger");
              }
              else{
                const resp = await context.addNote(title, description);
                navigate(`/`);
                context.handleAlert("Note Added Sucessfully...", "success");
              }
            }}
          >
            Submit
          </div>
        </form>
      </div>
    </div>
  );
}
