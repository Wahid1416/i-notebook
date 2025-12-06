import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import AddNotes from "./components/AddNotes";
import EditNote from "./components/EditNote";
import React from "react";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";


function App() {




  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-notes" element={<AddNotes />} />
            <Route path="/edit-note/:id" element={<EditNote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* fallback/redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
