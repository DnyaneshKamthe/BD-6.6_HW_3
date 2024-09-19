const express = require('express');
const { resolve } = require('path');
const { getAllBooks, getBookById } = require("./controllers/index");
const { rmSync } = require('fs');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.get("/books", (req, res) => {
  try {
    let result = getAllBooks();
    if(result.length === 0){
      res.status(404).json({message : "No books found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({error : "Internal server error"})
  }
})

app.get("/books/details/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let result = getBookById(id);
    if(!result){
      res.status(404).json({message : "Book not found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({error : "Internal server error"})
  }
})

module.exports = { app }