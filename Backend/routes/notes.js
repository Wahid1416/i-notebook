const express = require("express");
const router = express.Router();
const notesSchema = require("../models/Notes"); // Your model
const { body, validationResult } = require("express-validator");
const featchuser = require("../middlewire/fetchUser");

// Route-1 add Notes

router.post(
  "/addnotes",
  featchuser,
  [
    body("title", "Invalid Password").isLength({ min: 5 }),
    body("description", "Invalid Email").notEmpty(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // console.log(req.body);
      const { title, description, tag } = req.body;

      const User_id = req.user.id;

      const note = new notesSchema({
        title,
        description,
        tag,
        user: User_id,
      });

      const savedNote = await note.save();

      res.send("your note saved Sucessfully");
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send("Internal server error");
    }
  }
);

// Route-2 get all notes
router.get("/fetchallnotes", featchuser, async (req, res) => {
  const User_id = req.user.id;
  try {
    let notes = await notesSchema.find({ user: User_id });
    // console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal server error");
  }
});



// Route-3 fetch a specific notes by id 
router.get(
  "/GetNote/:id",
  featchuser,
  async (req, res) => {

    const User_id = req.user.id;
    let note= await notesSchema.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }

    if(note.user.toString()!==User_id){
      return res.status(401).send("Not Allowed");
    }
    res.json({note});

  })


// Route-4 update notes
router.put(
  "/UpdateNote/:id",
  featchuser,
  [
    body("title", "Invalid Password").isLength({ min: 5 }),
    body("description", "Invalid Email").notEmpty(),
  ],
  async (req, res) => {

    const User_id = req.user.id;
    let note= await notesSchema.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }

    if(note.user.toString()!==User_id){
      return res.status(401).send("Not Allowed");
    }
    
    const { title, description, tag } = req.body;
    const newNote={};
    if(title){newNote.title=title;}
    if(description){newNote.description=description;}
    if(tag){newNote.tag=tag;}

    note=await notesSchema.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});



  }) ;




// Route-5 Delete notes

router.delete(
  "/DeleteNote/:id",
  featchuser,
  async (req, res) => {

    const User_id = req.user.id;
    let note= await notesSchema.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }

    if(note.user.toString()!==User_id){
      return res.status(401).send("Not Allowed");
    }
    note=await notesSchema.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});




    
    }) ;



module.exports = router;
