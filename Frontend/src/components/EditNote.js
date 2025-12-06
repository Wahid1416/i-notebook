import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NotesContext";

export default function EditNote() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { id } = useParams();
  const { singleNote, updateNote } = context;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const func = async () => {
      let note = await singleNote(id);
      note = note.note;

      setTitle(note.title);
      setDescription(note.description);
    };
    func();
  }, []);

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
              // aria-describedby="emailHelp"
              minLength={5}
              required
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
          <div
            disable={description.length<5 || title.length<5}
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              if (description.length < 5){
                context.handleAlert("Note Added Description length less than 5...", "danger");
              }
              else if (title.length < 5){
                context.handleAlert("Note Added title length less than 5...", "danger");
              }
              else{
                context.updateNote(id, title, description);
                navigate(`/`);
                context.handleAlert("Note Edited Sucessfully...", "success");
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
