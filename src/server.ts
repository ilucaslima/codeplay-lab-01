import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "node:http";
import router from "./routes";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`🚀 SERVER RODANDO NA PORTA ${PORT}`);
});
