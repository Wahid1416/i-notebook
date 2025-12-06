import { useContext, useState } from "react";
import noteContext from "../../context/notes/NotesContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (email, password) => {
    email=email.toLowerCase();
    const url_fetch = `http://localhost:3000/api/auth/signin`;
    const response = await fetch(url_fetch, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: context.theme === "Dark" ? "black" : "",
        color: context.theme === "Dark" ? "white" : "",
      }}
      data-bs-theme={context.theme === "Dark" ? "dark" : "light"}
    >
      <form
        style={{
          paddingTop: "20px",
          width: "70vw",
        }}
        className="container"
      >
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={async (e) => {
            e.preventDefault();
            let resp = await signin(email, password);
            if (resp.error) {
              context.handleAlert(resp.error, "danger");
            } else {
              context.setUserToken(resp.token);
              navigate(`/`);
              context.handleAlert("Signed in sucessfully.....", "sucess");
              context.setRefress(!context.refress);
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
