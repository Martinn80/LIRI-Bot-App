// Require and local linke files
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
moment().format();
const axios = require('axios');
const fs = require('fs');

let command = process.argv[2];
let value = process.argv[3];


// Switch Statement

function mainMenu(command, value) {
    switch (command) {
        case "concert-this":
            concertThis(value);
            break;
        case "spotify-this-song":
            spotifySong(value);
            break;
        case "movie-this":
            movieThis(value);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            break;
    };
}

// Create search function for each variable
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {

                let datetime = response.data[i].datetime;
                let dateArr = datetime.split('T');
                console.log(dateArr);

                let concertResults =
                    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "YYYY-MM-DD").format("MM-DD-YYYY");

                console.log(concertResults);
            }
        })
        .catch(function (error) {
            console.log(error);
        });


}

function spotifySong(value) {
    if (!value) {
        value = "The Sign Ace of Base";
    }
    spotify
        .search({ type: 'track', query: value })
        .then(function (response) {

            for (let i = 0; i < 5; i++) {
                let spotifyResults =
                    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^" +
                    "\nArtist: " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;


                console.log(spotifyResults);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis(value) {
    if (!value) {
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            let movieResults =
                "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^" +
                "\nMovie Title: " + response.data.Title +
                "\nYear of Release: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry Produced: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors/Actresses: " + response.data.Actors;

            console.log(movieResults);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function doThis(value) {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(',');
        console.log(dataArr)
        let commandFromFile = dataArr[0]
        let songName = dataArr[1]
        mainMenu(dataArr[0], dataArr[1])
    })
}
mainMenu(command, value);