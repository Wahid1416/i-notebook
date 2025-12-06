import NoteContext from "./NotesContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const url = "http://localhost:3000";
  const [userToken, setUserToken] = useState("");
  const [theme, setTheme] = useState("Dark");
  const [notes, setNotes] = useState([]);
  const [refress, setRefress] = useState(false);

  // ADD Notes
  const addNote = async (title, description) => {
    const url_fetch = `${url}/api/notes/addnotes`;
    // console.log("started note adding....")
    try {
      const response = await fetch(url_fetch, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userToken,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      
      const result = await response.json();
      return result
      // console.log("notes", result);
      // setNotes(result)
    } catch (error) {
      console.error(error.message);
    }
    setRefress(!refress);
  };

  // delete note
  const deleteNote = async (id) => {
    const url_fetch = `${url}/api/notes/DeleteNote/${id}`;
    try {
      const response = await fetch(url_fetch, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userToken,
        },
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("notes", result);
      // setNotes(result)
    } catch (error) {
      console.error(error.message);
    }
    setRefress(!refress);
  };

  // Fetch a single note
  const singleNote = async (id) => {
    const url_fetch = `${url}/api/notes/GetNote/${id}`;
    try {
      const response = await fetch(url_fetch, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userToken,
        },
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("notes", result);
      return result;
      // setNotes(result)
    } catch (error) {
      console.error(error.message);
    }
  };

  // Update a note
  const updateNote = async (id, title, description) => {
    const url_fetch = `${url}/api/notes/UpdateNote/${id}`;
    try {
      const response = await fetch(url_fetch, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userToken,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error(error.message);
    }
    setRefress(!refress);
  };

  // Featching All notes
  useEffect(() => {
    async function getAllNotes(userToken) {
      setNotes([]);
      const url_fetch = url + "/api/notes/fetchallnotes";
      try {
        const response = await fetch(url_fetch, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": userToken,
          },
        });
        // console.log(response)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("notes",result)
        setNotes(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    
    getAllNotes(userToken);
  }, [refress,userToken]);

  // Show Alert
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("Danger");
  const [messageType, setMessageType] = useState("Hii");  //0-->sucesss,1-->danger

  
  const handleAlert = (message,messageType) => {
    setMessage(message)
    setMessageType(messageType)
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  return (
    <NoteContext.Provider
      value={{
        theme,
        setTheme,
        notes,
        setNotes,
        deleteNote,
        addNote,
        singleNote,
        updateNote,
        handleAlert,
        alert,
        message,
        messageType,
        userToken,
        setUserToken,
        refress,
        setRefress
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
