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
app.post("/api/notes", function(req,res){
    var newNote = req.body;
    var db = fs.readFileSync("./db/db.json","utf8");
    notesArray.push(newNote);

    // tempFile = db.replace("Test Title",newNote.title);
    // tempFile = tempFile.replace("Test text",newNote.text);
    console.log(newNote);
    var allNotes = JSON.stringify(notesArray);
    console.log(allNotes);
    fs.writeFileSync("./db/db.json",allNotes);
    res.json(newNote);
})



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
