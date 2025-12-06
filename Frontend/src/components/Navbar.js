import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/NotesContext";

export default function Navbar() {
  const location = useLocation();
  const context = useContext(noteContext);
  const { alert, message, messageType, userToken } = context;

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme={context.theme === "Dark" ? "dark" : "light"}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            I-NoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/add-notes" ? "active" : ""
                  }`}
                  to="/add-notes"
                >
                  Add Notes
                </Link>
              </li>
            </ul>
            {userToken === "" ? (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
              <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                  onClick={(e)=>{
                    context.setUserToken("")
                    context.setRefress(!context.refress)
                    context.handleAlert("Loggout Sucessfully......", "danger");
                  }}
                >
                  Logout
                </Link>
              </>
            )}

            <label
              className="btn btn-outline-primary m-2"
              onClick={
                context.theme === "Dark"
                  ? () => context.setTheme("Light")
                  : () => context.setTheme("Dark")
              }
            >
              {context.theme}
            </label>
            <br></br>
          </div>
        </div>
      </nav>
      {alert && (
        <div
          className={`alert alert-${messageType}`}
          style={{ margin: "0", borderRadius: "0" }}
          role="alert"
        >
          {message}
        </div>
      )}
    </>
  );
}
