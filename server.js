//Express set up
var fs = require("fs");
var express = require("express");
var path = require("path");
var mysql = require("mysql");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Routes
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes",function(req,res){
    var db = fs.readFileSync("./db/db.json","utf8");
    return res.json(JSON.parse(db));
})

//creating notes

var notesArray = [];
let ID = 1;
app.post("/api/notes", function(req,res){
    var newNote = req.body;
    newNote.id = ID;
    var db = fs.readFileSync("./db/db.json","utf8");
    notesArray.push(newNote);

    var allNotes = JSON.stringify(notesArray);
    
    fs.writeFileSync("./db/db.json",allNotes);
    ID ++;
    res.json(newNote);
})

// deleting notes

app.delete("/api/notes/:id", function(req,res){
    var deleteNote = req.params.id;

    notesArray = notesArray.filter(function(obj){
        return obj.id != deleteNote;
    });
    console.log(notesArray);
    var deletedNotes = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json",deletedNotes);
    
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
