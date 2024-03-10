const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj,owner:"65e5ba3f6a8b01347166703e"}));
    await Listing.insertMany(initdata.data);
    console.log("Data was initilized");
}

initDB();  