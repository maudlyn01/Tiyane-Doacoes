import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import communityRoutes from "./routes/community-routes";
import userRoutes from "./routes/user-routes"
import intermediateRouter from "./routes/intermediate-routes"
import donationRouter from "./routes/donation-routes";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3001;

app.use("/community", communityRoutes);
app.use("/intermediate",intermediateRouter);
app.use("/user",userRoutes);
app.use("/donation",donationRouter);



mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));