const express = require("express");
const path = require("path");
const cors = require("cors")
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json())
app.use(cors())
const dbPath = path.join(__dirname, "l.db");

let db = null;

const z = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3008, () => {
      console.log("Server Running at http://localhost:3008/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

z();

app.get("/", async(request,response)=>{
    const query=`select * from wwe;`
    const a = await db.all(query)
    response.send(a)
})