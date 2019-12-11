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
    return res.json(db);
})

//creating notes
app.post("/api/notes", function(req,res){
    var newNote = req.body;
    var db = fs.readFileSync("./db/db.json","utf8");
    var tempNote = db.replace("Test Title",newNote.title);
    tempNote = tempNote.replace("Test Text",newNote.text);
    fs.writeFileSync("db.json",tempNote);
    res.json(newNote);
})



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
