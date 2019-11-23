require("dotenv").config();
const axios = require('axios');
// const keys = require("./keys.js");

const url = "https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp";

axios.get(url).then(res => console.log(res));
