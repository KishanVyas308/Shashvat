import  express  from "express";
import cors from "cors";


const app = express();


app.use(express.json());
app.use(cors())

// Routers

//? Auth route



app.listen(3000, () => {
    console.log("Server is running on port 3000");
}   )