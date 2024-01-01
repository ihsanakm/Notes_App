require("dotenv").config();

const express = require("express");
const connectToDb = require("./config/connectToDB");
const noteRoutes = require("./routes/noteRoutes");
const usersRoute = require("./routes/usersRoute")
const cors = require("cors")
var cookieParser = require('cookie-parser')
var requireAuth = require('./middleware/auth')


const app = express();

app.use(express.json());
app.use(cors({
  origin:true,
  credentials: true
}))
app.use(cookieParser())


connectToDb();

app.post("/signup", usersRoute.signup);
app.post("/login", usersRoute.login);
app.get("/logout", usersRoute.logout);
app.get("/check-auth", requireAuth, usersRoute.checkAuth);



app.get("/note", noteRoutes.getNotes);

app.get("/note/:id", noteRoutes.getNote );

app.post("/note", noteRoutes.createNote );

app.put("/update/:id", noteRoutes.updateNote );

app.delete("/delete/:id", noteRoutes.deleteNote );

app.listen(process.env.PORT, () => {
  console.log(`I am working on ${process.env.PORT}`);
});
