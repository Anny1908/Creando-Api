const express = require("express");
const app = express();
let cors = require("cors");
//const { request, response } = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const albuns = require("./albumsData.json");


app.use(cors());
app.use(bodyParser.json())
    // crear endpoint

app.get("/", function(request, response) {
    response.send("nueva API");
});

const albumsData = [{
        albumId: "10",
        artistName: "Beyoncé",
        collectionName: "Lemonade",
        artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
        releaseDate: "2016-04-25T07:00:00Z",
        primaryGenreName: "Pop",
        url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
        albumId: "11",
        artistName: "Beyoncé",
        collectionName: "Live in the world",
        artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
        albumId: "12",
        artistName: "Beyoncé",
        collectionName: "Dangerously In Love",
        artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
];

app.get("/albums/:albumId", (req, res) => {
    const id = req.params.albumId;
    const album = albuns.filter(el => el.albumId === id);
    res.json(album);
});

app.post("/albums/addNew", (req, res) => {
    console.log("POST /album route");
    const newAlbum = req.body;
    let newAlbumData = albuns;
    let maxId = Math.max(...newAlbumData.map((el) => el.albumId));
    newAlbum.albumId = `${maxId + 1}`;
    newAlbumData.push(newAlbum);
    fs.writeFile("./albumsData.json", JSON.stringify(newAlbumData), () => {});
    res.send("POST album");
});

app.delete("/albums/:albumId", (req, res) => {
    console.log("DELETE /albums route");
    const albumId = req.params.albumId;
    const album = albuns.filter((el) => {
        el.albumId === albumId;
    });
    let index = albuns.indexOf(album[0]);
    let newAlbumData = albuns;
    newAlbumData.splice(index, 1);
    fs.writeFileSync("./albumsData.json", JSON.stringify(newAlbumData), () => {});
    res.status(200).json({ succes: true });
});

app.get("/albums", function(req, res) {
    res.json(albuns);
});

// star our server
app.listen(4000, function() {
    console.log("Server is listening on port 4000. Ready to accept requests!");
});