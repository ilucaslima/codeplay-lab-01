import express from "express";
import cors from "cors";
import http from "node:http";

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/hello", (req, res) => {
  res.send("Você está visualizando a primeira rota do servidor");
});

server.listen(3000, () => {
  console.log(`🚀 SERVER RODANDO NA PORTA ${3000}`);
});
